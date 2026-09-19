'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/context/store-context'
import { useAuth } from '@/lib/context/auth-context'
import { useToast } from '@/lib/context/toast-context'
import { Produk, TransaksiItem, Transaksi, Piutang } from '@/lib/types'
import { formatRupiah, formatTanggal, formatJam } from '@/lib/utils'
import {
  Search, Plus, Minus, Trash2, ShoppingCart, ChevronLeft,
  Printer, Barcode, CheckCircle2, AlertCircle, Clock, UserCheck, RefreshCw,
  Layers, PauseCircle, PlayCircle, Calendar
} from 'lucide-react'
import Link from 'next/link'
import { Modal } from '@/components/ui/Modal'

interface CartItem extends TransaksiItem {
  produk: Produk
}

interface PendingOrder {
  id: string
  nomor: string
  waktu: string
  pelangganId: string
  pelangganNama: string
  cart: CartItem[]
  diskon: number
  metodeBayar: 'tunai' | 'transfer' | 'qris' | 'kredit'
}

export default function TransaksiBaruPage() {
  const { products, setProducts, transaksi, setTransaksi, pelanggan, setPelanggan, piutang, setPiutang } = useStore()
  const { user } = useAuth()
  const { showToast } = useToast()
  const router = useRouter()

  const [search, setSearch] = useState('')
  const [cart, setCart] = useState<CartItem[]>([])
  const [pelangganId, setPelangganId] = useState('c1')
  const [metodeBayar, setMetodeBayar] = useState<'tunai' | 'transfer' | 'qris' | 'kredit'>('tunai')
  const [jatuhTempo, setJatuhTempo] = useState<string>('')
  const [bayar, setBayar] = useState('')
  const [diskon, setDiskon] = useState(0)

  // Hold / Pending Transactions (iPOS 5 Pro Feature)
  const [pendingOrders, setPendingOrders] = useState<PendingOrder[]>([])
  const [pendingModalOpen, setPendingModalOpen] = useState(false)

  // Kasir Shift State
  const [shiftStart, setShiftStart] = useState<string>('')
  const [shiftModalOpen, setShiftModalOpen] = useState(false)
  const [modalSuksesOpen, setModalSuksesOpen] = useState(false)
  const [lastTrx, setLastTrx] = useState<Transaksi | null>(null)

  // Barcode Scanner emulation
  const [barcodeInput, setBarcodeInput] = useState('')
  const barcodeRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const now = new Date()
    setShiftStart(now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }))

    // Default jatuh tempo kredit = 30 hari ke depan
    const defaultTempo = new Date()
    defaultTempo.setDate(now.getDate() + 30)
    setJatuhTempo(defaultTempo.toISOString().split('T')[0])
  }, [])

  const produkFiltered = useMemo(() =>
    products.filter(p =>
      p.active && (
        p.nama.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase()) ||
        (p.keterangan || '').toLowerCase().includes(search.toLowerCase())
      )
    ), [search, products])

  // Hitung harga berdasar kuantiti (iPOS 5 Multi-tier wholesale price)
  const getTierPrice = (p: Produk, qty: number): { harga: number; tipe: 'eceran' | 'grosir_1' | 'grosir_2' } => {
    if (p.harga_grosir_2 && p.min_qty_grosir_2 && qty >= p.min_qty_grosir_2) {
      return { harga: p.harga_grosir_2, tipe: 'grosir_2' }
    }
    if (p.harga_grosir_1 && p.min_qty_grosir_1 && qty >= p.min_qty_grosir_1) {
      return { harga: p.harga_grosir_1, tipe: 'grosir_1' }
    }
    return { harga: p.harga_jual, tipe: 'eceran' }
  }

  const subtotal = cart.reduce((s, i) => s + i.subtotal, 0)
  const total = Math.max(0, subtotal - diskon)
  const bayarNum = parseInt(bayar.replace(/\D/g, '')) || 0
  const kembalian = bayarNum - total

  // Dynamic quick cash shortcuts
  const quickCashOptions = useMemo(() => {
    if (total <= 0) return [10000, 50000, 100000]
    const exact = total
    const next50 = Math.ceil(total / 50000) * 50000
    const next100 = Math.ceil(total / 100000) * 100000
    const opts = [exact, next50 > exact ? next50 : exact + 20000, next100 > next50 ? next100 : exact + 50000]
    return Array.from(new Set(opts)).sort((a, b) => a - b)
  }, [total])

  const addToCart = (produk: Produk) => {
    const existing = cart.find(i => i.produk_id === produk.id)
    const currentQty = existing ? existing.qty : 0
    const newQty = currentQty + 1

    if (newQty > produk.stok) {
      showToast(`Stok ${produk.nama} tersisa ${produk.stok} ${produk.satuan_jual}`, 'error')
      return
    }

    const { harga, tipe } = getTierPrice(produk, newQty)

    setCart(prev => {
      if (existing) {
        return prev.map(i => i.produk_id === produk.id
          ? {
              ...i,
              qty: newQty,
              harga,
              harga_tipe: tipe,
              subtotal: newQty * harga
            }
          : i
        )
      }
      return [...prev, {
        id: `ci-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        produk_id: produk.id,
        produk_nama: produk.nama,
        qty: 1,
        satuan: produk.satuan_jual,
        harga,
        harga_tipe: tipe,
        subtotal: harga,
        produk
      }]
    })

    if (tipe !== 'eceran') {
      showToast(`Otomatis dapat harga ${tipe === 'grosir_2' ? 'Grosir Karton' : 'Grosir Pak'}!`, 'info')
    }
  }

  const updateQty = (id: string, delta: number) => {
    const item = cart.find(i => i.id === id)
    if (!item) return

    const newQty = item.qty + delta
    if (delta > 0 && newQty > item.produk.stok) {
      showToast(`Maksimum stok ${item.produk.nama} adalah ${item.produk.stok} ${item.produk.satuan_jual}`, 'error')
      return
    }

    if (newQty <= 0) {
      setCart(prev => prev.filter(i => i.id !== id))
      return
    }

    const { harga, tipe } = getTierPrice(item.produk, newQty)
    setCart(prev => prev.map(i => i.id === id ? {
      ...i,
      qty: newQty,
      harga,
      harga_tipe: tipe,
      subtotal: newQty * harga
    } : i))
  }

  // Barcode Scanner Enter
  const handleBarcodeScan = (e: React.FormEvent) => {
    e.preventDefault()
    if (!barcodeInput.trim()) return

    const found = products.find(p => p.sku.toLowerCase() === barcodeInput.trim().toLowerCase())
    if (found) {
      addToCart(found)
      showToast(`Scan berhasil: ${found.nama}`, 'success')
      setBarcodeInput('')
    } else {
      showToast(`Barcode SKU "${barcodeInput}" tidak ditemukan!`, 'error')
    }
  }

  // Hold Transaksi (Tunda Sementara)
  const handleHoldOrder = () => {
    if (cart.length === 0) {
      showToast('Keranjang masih kosong, tidak ada transaksi untuk ditahan', 'error')
      return
    }

    const selPelanggan = pelanggan.find(c => c.id === pelangganId)
    const pending: PendingOrder = {
      id: `hold-${Date.now()}`,
      nomor: `HOLD-${String(pendingOrders.length + 1).padStart(3, '0')}`,
      waktu: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      pelangganId,
      pelangganNama: selPelanggan?.nama || 'Umum',
      cart: [...cart],
      diskon,
      metodeBayar
    }

    setPendingOrders(prev => [pending, ...prev])
    setCart([])
    setBayar('')
    setDiskon(0)
    showToast(`Transaksi ditahan sementara (${pending.nomor}). Siap melayani pelanggan berikutnya!`, 'info')
  }

  // Recall / Buka Kembali Transaksi Tertunda
  const handleResumeOrder = (pending: PendingOrder) => {
    if (cart.length > 0) {
      const confirmOverride = window.confirm('Keranjang saat ini masih ada barang. Timpa dengan transaksi yang ditahan?')
      if (!confirmOverride) return
    }

    setCart(pending.cart)
    setPelangganId(pending.pelangganId)
    setDiskon(pending.diskon)
    setMetodeBayar(pending.metodeBayar)
    setPendingOrders(prev => prev.filter(p => p.id !== pending.id))
    setPendingModalOpen(false)
    showToast(`Transaksi ${pending.nomor} kembali dibuka!`, 'success')
  }

  const handleSelesai = () => {
    if (cart.length === 0) return
    if (metodeBayar === 'tunai' && kembalian < 0) {
      showToast('Nominal bayar tunai masih kurang!', 'error')
      return
    }

    const selectedPelanggan = pelanggan.find(c => c.id === pelangganId)
    if (metodeBayar === 'kredit' && pelangganId === 'c1') {
      showToast('Penjualan Tempo / Bon Piutang wajib memilih nama Toko/Pelanggan terdaftar!', 'error')
      return
    }

    const newTrxNumber = `TRX-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${String(transaksi.length + 1).padStart(3, '0')}`

    const newTrx: Transaksi = {
      id: `t-${Date.now()}`,
      nomor: newTrxNumber,
      tanggal: new Date().toISOString(),
      kasir_id: user?.id || 'u2',
      kasir_nama: user?.name || 'Kasir',
      pelanggan_id: pelangganId,
      pelanggan_nama: selectedPelanggan?.nama || 'Umum / Tunai',
      items: cart.map(c => ({
        id: c.id,
        produk_id: c.produk_id,
        produk_nama: c.produk_nama,
        qty: c.qty,
        satuan: c.satuan,
        harga: c.harga,
        harga_tipe: c.harga_tipe,
        subtotal: c.subtotal
      })),
      subtotal,
      diskon,
      total,
      bayar: metodeBayar === 'tunai' ? bayarNum : (metodeBayar === 'kredit' ? 0 : total),
      kembalian: metodeBayar === 'tunai' ? Math.max(0, kembalian) : 0,
      metode_bayar: metodeBayar,
      jatuh_tempo: metodeBayar === 'kredit' ? jatuhTempo : undefined,
      status_pembayaran: metodeBayar === 'kredit' ? 'belum_lunas' : 'lunas',
      status: 'selesai'
    }

    // 1. Simpan Transaksi
    setTransaksi(prev => [newTrx, ...prev])

    // 2. Jika metode Kredit (Piutang Tempo), catat ke buku piutang
    if (metodeBayar === 'kredit') {
      const newPiutang: Piutang = {
        id: `piu-${Date.now()}`,
        transaksi_id: newTrx.id,
        nomor_transaksi: newTrx.nomor,
        pelanggan_id: pelangganId,
        pelanggan_nama: selectedPelanggan?.nama || 'Pelanggan',
        total_piutang: total,
        sisa_piutang: total,
        jatuh_tempo: jatuhTempo,
        status: 'belum_lunas'
      }
      setPiutang(prev => [newPiutang, ...prev])

      // Tambahkan ke saldo piutang pelanggan
      setPelanggan(prev => prev.map(c => c.id === pelangganId ? {
        ...c,
        total_piutang: (c.total_piutang || 0) + total,
        total_pembelian: c.total_pembelian + total
      } : c))
    }

    // 3. Kurangi stok produk
    setProducts(prev => prev.map(p => {
      const cartItem = cart.find(ci => ci.produk_id === p.id)
      if (cartItem) {
        return { ...p, stok: Math.max(0, p.stok - cartItem.qty) }
      }
      return p
    }))

    setLastTrx(newTrx)
    setModalSuksesOpen(true)
    showToast(metodeBayar === 'kredit' ? 'Transaksi Kredit / Piutang Tempo Berhasil Dicatat!' : 'Transaksi POS Berhasil Disimpan!', 'success')
  }

  const resetCart = () => {
    setCart([])
    setBayar('')
    setDiskon(0)
    setModalSuksesOpen(false)
  }

  // Print Receipt Thermal (58mm/80mm format)
  const printReceipt = (t: Transaksi) => {
    const printWindow = window.open('', '_blank', 'width=380,height=600')
    if (!printWindow) return

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Struk - ${t.nomor}</title>
        <style>
          body {
            font-family: 'Courier New', Courier, monospace;
            width: 280px;
            margin: 0 auto;
            padding: 10px;
            font-size: 12px;
            color: #000;
          }
          .header { text-align: center; margin-bottom: 10px; }
          .title { font-size: 16px; font-weight: bold; margin: 0; }
          .subtitle { font-size: 11px; margin: 2px 0; }
          .divider { border-top: 1px dashed #000; margin: 6px 0; }
          .row { display: flex; justify-content: space-between; margin: 3px 0; }
          .item-name { font-weight: bold; }
          .footer { text-align: center; margin-top: 15px; font-size: 10px; }
          .tag { font-size: 9px; padding: 1px 3px; border: 1px solid #000; }
        </style>
      </head>
      <body>
        <div class="header">
          <p class="title">KHALIFA NIAGA</p>
          <p class="subtitle">Distributor & Grosir Alat Tulis Kantor</p>
          <p class="subtitle">Jl. Pasar Niaga No. 8 | 0812-9988-7766</p>
          <div class="divider"></div>
          <div class="row"><span>No: ${t.nomor}</span></div>
          <div class="row"><span>Waktu: ${formatTanggal(t.tanggal)} ${formatJam(t.tanggal)}</span></div>
          <div class="row"><span>Kasir: ${t.kasir_nama}</span><span>Plg: ${t.pelanggan_nama || 'Umum'}</span></div>
          <div class="divider"></div>
        </div>

        <div>
          ${t.items.map(item => `
            <div style="margin-bottom: 4px;">
              <div class="item-name">${item.produk_nama} ${item.harga_tipe && item.harga_tipe !== 'eceran' ? `<span class="tag">[GROSIR]</span>` : ''}</div>
              <div class="row">
                <span>${item.qty} ${item.satuan} x Rp ${item.harga.toLocaleString('id-ID')}</span>
                <span>Rp ${item.subtotal.toLocaleString('id-ID')}</span>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="divider"></div>
        <div class="row"><span>Subtotal</span><span>Rp ${t.subtotal.toLocaleString('id-ID')}</span></div>
        ${t.diskon > 0 ? `<div class="row"><span>Diskon</span><span>-Rp ${t.diskon.toLocaleString('id-ID')}</span></div>` : ''}
        <div class="row" style="font-weight: bold; font-size: 14px;">
          <span>TOTAL</span><span>Rp ${t.total.toLocaleString('id-ID')}</span>
        </div>
        <div class="row"><span>Metode</span><span style="text-transform:uppercase; font-weight:bold;">${t.metode_bayar === 'kredit' ? 'TEMPO (PIUTANG)' : t.metode_bayar}</span></div>
        ${t.metode_bayar === 'kredit' ? `<div class="row"><span>Jatuh Tempo</span><span>${formatTanggal(t.jatuh_tempo || '')}</span></div>` : ''}
        ${t.metode_bayar === 'tunai' ? `
          <div class="row"><span>Bayar Tunai</span><span>Rp ${t.bayar.toLocaleString('id-ID')}</span></div>
          <div class="row"><span>Kembalian</span><span>Rp ${t.kembalian.toLocaleString('id-ID')}</span></div>
        ` : ''}

        <div class="divider"></div>
        <div class="footer">
          <p>Terima kasih telah berbelanja di</p>
          <p><strong>KHALIFA NIAGA</strong></p>
          <p>Barang yang sudah dibeli dapat ditukar jika ada cacat pabrik (maks 2 hari).</p>
        </div>
        <script>
          window.onload = function() {
            window.print();
            setTimeout(function() { window.close(); }, 500);
          }
        </script>
      </body>
      </html>
    `)
    printWindow.document.close()
  }

  return (
    <div className="h-full flex flex-col md:flex-row bg-gray-50 overflow-hidden animate-in fade-in duration-200">
      {/* Kiri: Katalog Produk & Barcode Search */}
      <div className="flex-1 flex flex-col p-4 md:p-6 overflow-hidden">
        {/* Topbar POS */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <Link href="/toko/transaksi" className="p-2 hover:bg-white rounded-xl border border-gray-200 shadow-xs transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </Link>
            <div>
              <h1 className="text-xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
                POS Kasir Grosir — KHALIFA NIAGA
              </h1>
              <p className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                <span>Kasir: <strong>{user?.name || 'Kasir Toko'}</strong></span>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                  <Clock className="w-3 h-3" /> Shift: {shiftStart}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {/* Tombol Hold / Pending (iPOS 5 Pro) */}
            <button
              onClick={() => setPendingModalOpen(true)}
              className="text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-2 rounded-xl shadow-xs flex items-center gap-1.5 transition-all relative"
            >
              <PauseCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>Tertunda</span>
              {pendingOrders.length > 0 && (
                <span className="w-5 h-5 bg-amber-600 text-white rounded-full text-[10px] font-black flex items-center justify-center">
                  {pendingOrders.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setShiftModalOpen(true)}
              className="text-xs font-bold text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 px-3 py-2 rounded-xl shadow-xs flex items-center gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5 text-blue-600" />
              Info Shift
            </button>
          </div>
        </div>

        {/* Barcode Quick Scan & Search Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 mb-4">
          <form onSubmit={handleBarcodeScan} className="sm:col-span-4 relative">
            <Barcode className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-600" />
            <input
              ref={barcodeRef}
              type="text"
              value={barcodeInput}
              onChange={e => setBarcodeInput(e.target.value)}
              placeholder="Scan Barcode / SKU (Enter)..."
              className="w-full pl-9 pr-3 py-2.5 bg-purple-50/60 border border-purple-200 rounded-xl text-xs font-mono font-bold focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-purple-400"
            />
          </form>

          <div className="sm:col-span-8 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari nama produk ATK, pulpen, pensil, spidol..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-xs"
            />
          </div>
        </div>

        {/* Grid Produk dengan info Multi-Tier Price */}
        <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 content-start pr-1 pb-4">
          {produkFiltered.map(p => {
            const inCart = cart.find(ci => ci.produk_id === p.id)
            const isOutOfStock = p.stok <= 0

            return (
              <button
                key={p.id}
                onClick={() => addToCart(p)}
                disabled={isOutOfStock}
                className={`bg-white border rounded-2xl p-3 text-left transition-all flex flex-col justify-between relative group ${
                  isOutOfStock
                    ? 'opacity-40 border-gray-200 cursor-not-allowed'
                    : inCart
                      ? 'border-blue-500 ring-2 ring-blue-100 shadow-sm'
                      : 'border-gray-200 hover:border-blue-400 hover:shadow-md'
                }`}
              >
                {inCart && (
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 text-white font-black text-xs rounded-full flex items-center justify-center shadow-md animate-in zoom-in">
                    {inCart.qty}
                  </span>
                )}

                <div>
                  <div className="w-full h-24 bg-gray-50/70 rounded-xl flex items-center justify-center mb-2 overflow-hidden border border-gray-100 p-1.5">
                    {p.image ? (
                      <img src={p.image} alt={p.nama} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                    ) : (
                      <ShoppingCart className="w-6 h-6 text-blue-400" />
                    )}
                  </div>
                  <p className="text-xs font-bold text-gray-900 line-clamp-2 leading-snug">{p.nama}</p>
                  <p className="text-[10px] text-gray-400 font-mono mt-0.5">{p.sku}</p>

                  {/* iPOS 5 Pro Tiered Price Info Badge */}
                  {p.harga_grosir_1 && (
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      <span className="text-[9px] bg-purple-50 text-purple-700 font-bold px-1.5 py-0.2 rounded border border-purple-100">
                        &ge;{p.min_qty_grosir_1} {p.satuan_jual}: {formatRupiah(p.harga_grosir_1)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-gray-400">Eceran:</p>
                    <p className="text-xs font-extrabold text-blue-700">{formatRupiah(p.harga_jual)}</p>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                    p.stok <= p.stok_minimum ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {p.stok} {p.satuan_jual}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Kanan: Keranjang & Billing POS */}
      <div className="w-full md:w-88 lg:w-96 bg-white border-t md:border-t-0 md:border-l border-gray-200 flex flex-col shadow-lg">
        {/* Header Keranjang & Pelanggan */}
        <div className="p-4 border-b border-gray-100 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-blue-600" />
              <h2 className="font-extrabold text-gray-900 text-base">Keranjang Kasir</h2>
            </div>
            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={handleHoldOrder}
                  className="text-xs text-amber-700 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-lg font-bold transition-colors flex items-center gap-1"
                  title="Tahan transaksi untuk melayani pelanggan lain"
                >
                  <PauseCircle className="w-3.5 h-3.5" />
                  Hold (Tahan)
                </button>
              )}
              {cart.length > 0 && (
                <button
                  onClick={() => setCart([])}
                  className="text-xs text-red-500 hover:text-red-700 font-medium"
                >
                  Kosongkan
                </button>
              )}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
              Pilih Pelanggan / Toko:
            </label>
            <select
              value={pelangganId}
              onChange={e => setPelangganId(e.target.value)}
              className="w-full text-xs font-medium px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {pelanggan.map(c => (
                <option key={c.id} value={c.id}>
                  {c.nama} ({c.tipe === 'grosir' ? 'Toko Grosir' : 'Eceran'})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Item List dengan Deteksi Otomatis Multi-Tier Grosir */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-100 p-2">
          {cart.length === 0 ? (
            <div className="py-16 text-center text-gray-400 text-xs">
              <ShoppingCart className="w-10 h-10 mx-auto text-gray-300 mb-2" />
              Belum ada item dipilih.<br />Klik produk atau scan barcode.
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="p-2.5 flex items-center gap-2 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-gray-900 truncate">{item.produk_nama}</p>
                    {item.harga_tipe && item.harga_tipe !== 'eceran' && (
                      <span className="text-[9px] px-1 py-0.2 bg-purple-100 text-purple-800 font-black rounded uppercase flex-shrink-0">
                        {item.harga_tipe === 'grosir_2' ? 'Grosir 2' : 'Grosir 1'}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-400">{formatRupiah(item.harga)} / {item.satuan}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => updateQty(item.id, -1)}
                    className="w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center font-bold text-gray-600"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-black w-6 text-center">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, 1)}
                    className="w-6 h-6 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setCart(c => c.filter(i => i.id !== item.id))}
                    className="w-6 h-6 text-gray-300 hover:text-red-500 ml-1 rounded flex items-center justify-center"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-xs font-bold text-gray-900 w-16 text-right">
                  {formatRupiah(item.subtotal)}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Ringkasan & Pembayaran (Support Kredit / Piutang Tempo iPOS 5) */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50 space-y-3">
          <div className="space-y-1.5 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal Item</span>
              <span className="font-semibold text-gray-900">{formatRupiah(subtotal)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Diskon Tambahan</span>
              <input
                type="number"
                value={diskon || ''}
                onChange={e => setDiskon(Math.max(0, parseInt(e.target.value) || 0))}
                placeholder="Rp 0"
                className="w-24 text-right px-2 py-1 border border-gray-200 bg-white rounded-lg text-xs font-bold text-red-600 focus:outline-none"
              />
            </div>
            <div className="flex justify-between font-black text-sm text-gray-900 border-t pt-2">
              <span>TOTAL TAGIHAN</span>
              <span className="text-blue-700 text-base">{formatRupiah(total)}</span>
            </div>
          </div>

          {/* Pilihan 4 Metode Bayar (Tunai, Transfer, QRIS, Kredit Tempo) */}
          <div className="grid grid-cols-4 gap-1 pt-1">
            {(['tunai', 'transfer', 'qris', 'kredit'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMetodeBayar(m)}
                className={`py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  metodeBayar === m
                    ? m === 'kredit'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {m === 'kredit' ? 'Tempo' : m}
              </button>
            ))}
          </div>

          {/* Input Tempo Jatuh Tempo jika Kredit */}
          {metodeBayar === 'kredit' && (
            <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Tanggal Jatuh Tempo:
                </span>
                <input
                  type="date"
                  value={jatuhTempo}
                  onChange={e => setJatuhTempo(e.target.value)}
                  className="px-2 py-1 bg-white border border-amber-300 rounded text-xs text-gray-800 font-bold focus:outline-none"
                  required
                />
              </div>
              <p className="text-[10px] text-amber-700 leading-tight">
                *Tagihan akan otomatis masuk ke Buku Piutang & saldo piutang toko pelanggan.
              </p>
            </div>
          )}

          {/* Input Tunai & Pecahan Cepat */}
          {metodeBayar === 'tunai' && (
            <div className="space-y-2 pt-1">
              <div>
                <input
                  type="text"
                  value={bayar}
                  onChange={e => setBayar(e.target.value)}
                  placeholder="Nominal uang diterima..."
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-1">
                {quickCashOptions.map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setBayar(String(opt))}
                    className="py-1 px-1 bg-white hover:bg-blue-50 border border-gray-200 text-gray-700 rounded-lg text-[11px] font-bold truncate transition-colors"
                  >
                    {formatRupiah(opt)}
                  </button>
                ))}
              </div>

              {bayarNum > 0 && (
                <div className={`p-2 rounded-xl text-xs font-bold flex justify-between ${
                  kembalian >= 0 ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  <span>{kembalian >= 0 ? 'Kembalian:' : 'Kurang:'}</span>
                  <span>{formatRupiah(Math.abs(kembalian))}</span>
                </div>
              )}
            </div>
          )}

          <button
            onClick={handleSelesai}
            disabled={cart.length === 0 || (metodeBayar === 'tunai' && kembalian < 0)}
            className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 disabled:opacity-40 text-white font-extrabold py-3 rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            {metodeBayar === 'kredit' ? 'Simpan Nota Kredit (Piutang)' : 'Selesaikan Transaksi & Simpan'}
          </button>
        </div>
      </div>

      {/* Modal Transaksi Tertunda / Hold List */}
      <Modal
        isOpen={pendingModalOpen}
        onClose={() => setPendingModalOpen(false)}
        title="Daftar Transaksi Ditahan (Hold Orders)"
        size="md"
      >
        <div className="space-y-3">
          {pendingOrders.length === 0 ? (
            <div className="py-8 text-center text-gray-400 text-xs">
              <PauseCircle className="w-8 h-8 mx-auto text-gray-300 mb-1" />
              Tidak ada transaksi yang sedang ditahan
            </div>
          ) : (
            pendingOrders.map(p => {
              const pendingSubtotal = p.cart.reduce((s, i) => s + i.subtotal, 0)
              return (
                <div key={p.id} className="p-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="font-extrabold text-gray-900 text-xs">{p.nomor} — {p.pelangganNama}</p>
                    <p className="text-[11px] text-gray-500">{p.cart.length} item · Ditahan jam {p.waktu}</p>
                    <p className="text-xs font-bold text-blue-600 mt-0.5">{formatRupiah(pendingSubtotal - p.diskon)}</p>
                  </div>
                  <button
                    onClick={() => handleResumeOrder(p)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs"
                  >
                    <PlayCircle className="w-3.5 h-3.5" />
                    Lanjutkan
                  </button>
                </div>
              )
            })
          )}
        </div>
      </Modal>

      {/* Modal Sukses & Cetak Struk */}
      <Modal
        isOpen={modalSuksesOpen}
        onClose={resetCart}
        title="Transaksi Berhasil!"
        size="sm"
      >
        <div className="text-center py-4 space-y-4">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">{lastTrx?.nomor}</p>
            <p className="text-xl font-black text-blue-700 mt-1">{formatRupiah(lastTrx?.total || 0)}</p>
            <p className="text-xs text-gray-500 mt-1">
              Metode: <strong className="uppercase">{lastTrx?.metode_bayar === 'kredit' ? 'TEMPO (PIUTANG)' : lastTrx?.metode_bayar}</strong>
              {lastTrx?.metode_bayar === 'tunai' && (
                <span> · Kembalian: <strong>{formatRupiah(lastTrx?.kembalian || 0)}</strong></span>
              )}
            </p>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={() => lastTrx && printReceipt(lastTrx)}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Printer className="w-4 h-4" />
              Cetak Struk Thermal (Print Receipt)
            </button>
            <button
              onClick={resetCart}
              className="w-full py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl text-xs font-bold"
            >
              Transaksi Baru Berikutnya
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal Shift Kasir */}
      <Modal
        isOpen={shiftModalOpen}
        onClose={() => setShiftModalOpen(false)}
        title="Informasi Shift Kasir"
        size="sm"
      >
        <div className="space-y-4 text-xs sm:text-sm">
          <div className="p-3 bg-blue-50 rounded-xl space-y-2 text-blue-950">
            <div className="flex justify-between">
              <span className="text-gray-500">Nama Petugas:</span>
              <span className="font-bold">{user?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Mulai Shift:</span>
              <span className="font-bold">{shiftStart} WIB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Status Register:</span>
              <span className="font-bold text-emerald-600">TERBUKA (ONLINE)</span>
            </div>
          </div>

          <div className="p-3 bg-gray-50 rounded-xl space-y-1.5">
            <p className="font-bold text-gray-800 text-xs">Aktivitas Toko Hari Ini:</p>
            <div className="flex justify-between text-gray-600">
              <span>Total Transaksi Selesai:</span>
              <span className="font-bold text-gray-900">{transaksi.length} Transaksi</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Total Omzet Shift Ini:</span>
              <span className="font-bold text-emerald-700">{formatRupiah(transaksi.reduce((s, t) => s + t.total, 0))}</span>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setShiftModalOpen(false)}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-xl text-xs font-bold"
            >
              Tutup
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
