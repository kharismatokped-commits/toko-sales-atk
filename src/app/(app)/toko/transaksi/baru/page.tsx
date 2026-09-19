'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/context/store-context'

import { Produk, TransaksiItem } from '@/lib/types'
import { formatRupiah } from '@/lib/utils'
import { Search, Plus, Minus, Trash2, ShoppingCart, ChevronLeft } from 'lucide-react'
import Link from 'next/link'

interface CartItem extends TransaksiItem {
  produk: Produk
}

export default function TransaksiBaruPage() {
  const { products, setProducts, transaksi, setTransaksi, pelanggan, setPelanggan, pembelian, setPembelian, salesVisit, setSalesVisit, prospek, setProspek, suppliers, setSuppliers, wilayah, setWilayah, users, setUsers } = useStore()


  const router = useRouter()
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState<CartItem[]>([])
  const [pelangganId, setPelangganId] = useState('c1')
  const [metodeBayar, setMetodeBayar] = useState<'tunai' | 'transfer' | 'qris'>('tunai')
  const [bayar, setBayar] = useState('')
  const [diskon, setDiskon] = useState(0)
  const [step, setStep] = useState<'kasir' | 'pembayaran'>('kasir')

  const produkFiltered = useMemo(() =>
    products.filter(p =>
      p.active && (
        p.nama.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase())
      )
    ), [search])

  const subtotal = cart.reduce((s, i) => s + i.subtotal, 0)
  const total = subtotal - diskon
  const bayarNum = parseInt(bayar.replace(/\D/g, '')) || 0
  const kembalian = bayarNum - total

  const addToCart = (produk: Produk) => {
    setCart(prev => {
      const existing = prev.find(i => i.produk_id === produk.id)
      if (existing) {
        return prev.map(i => i.produk_id === produk.id
          ? { ...i, qty: i.qty + 1, subtotal: (i.qty + 1) * produk.harga_jual }
          : i
        )
      }
      return [...prev, {
        id: `ci-${Date.now()}`,
        produk_id: produk.id,
        produk_nama: produk.nama,
        qty: 1,
        satuan: produk.satuan_jual,
        harga: produk.harga_jual,
        subtotal: produk.harga_jual,
        produk
      }]
    })
  }

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev
      .map(i => i.id === id ? { ...i, qty: i.qty + delta, subtotal: (i.qty + delta) * i.harga } : i)
      .filter(i => i.qty > 0)
    )
  }

  const handleSelesai = () => {
    // Nanti: simpan ke Supabase
    alert(`Transaksi berhasil!\nTotal: ${formatRupiah(total)}\nKembalian: ${formatRupiah(kembalian)}`)
    router.push('/toko/transaksi')
  }

  return (
    <div className="h-full flex flex-col md:flex-row">
      {/* Kiri: pilih produk */}
      <div className="flex-1 flex flex-col p-4 overflow-hidden">
        <div className="flex items-center gap-3 mb-4">
          <Link href="/toko/transaksi" className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <h1 className="text-xl font-bold text-gray-900">Transaksi Baru</h1>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari produk..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex-1 overflow-y-auto grid grid-cols-2 lg:grid-cols-3 gap-3 content-start">
          {produkFiltered.map(p => (
            <button
              key={p.id}
              onClick={() => addToCart(p)}
              disabled={p.stok === 0}
              className="bg-white border border-gray-200 rounded-xl p-3 text-left hover:border-blue-300 hover:shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed flex flex-col justify-between"
            >
              <div>
                <div className="w-full h-24 bg-gray-50 rounded-lg flex items-center justify-center mb-2 overflow-hidden border border-gray-100 p-1">
                  {p.image ? (
                    <img src={p.image} alt={p.nama} className="w-full h-full object-contain" />
                  ) : (
                    <ShoppingCart className="w-6 h-6 text-blue-400" />
                  )}
                </div>
                <p className="text-xs font-bold text-gray-900 line-clamp-2 leading-tight">{p.nama}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{p.sku}</p>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-50 flex items-center justify-between">
                <p className="text-xs font-bold text-blue-600">{formatRupiah(p.harga_jual)}</p>
                <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                  {p.stok} {p.satuan_jual}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Kanan: keranjang */}
      <div className="w-full md:w-80 lg:w-96 bg-white border-t md:border-t-0 md:border-l border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <ShoppingCart className="w-5 h-5 text-gray-500" />
            <h2 className="font-semibold text-gray-900">Keranjang ({cart.length})</h2>
          </div>
          <select
            value={pelangganId}
            onChange={e => setPelangganId(e.target.value)}
            className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          >
            {pelanggan.map(c => (
              <option key={c.id} value={c.id}>{c.nama}</option>
            ))}
          </select>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
          {cart.length === 0 && (
            <div className="py-12 text-center text-gray-400 text-sm">
              <ShoppingCart className="w-10 h-10 mx-auto mb-2 text-gray-300" />
              Belum ada produk
            </div>
          )}
          {cart.map(item => (
            <div key={item.id} className="px-4 py-3 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{item.produk_nama}</p>
                <p className="text-xs text-gray-500">{formatRupiah(item.harga)} / {item.satuan}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center">
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-sm font-medium w-6 text-center">{item.qty}</span>
                <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 bg-blue-100 hover:bg-blue-200 rounded flex items-center justify-center">
                  <Plus className="w-3 h-3 text-blue-600" />
                </button>
                <button onClick={() => setCart(c => c.filter(i => i.id !== item.id))} className="w-6 h-6 hover:bg-red-50 rounded flex items-center justify-center text-gray-400 hover:text-red-500">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              <span className="text-sm font-semibold text-gray-900 w-20 text-right">{formatRupiah(item.subtotal)}</span>
            </div>
          ))}
        </div>

        {/* Summary & payment */}
        <div className="p-4 border-t border-gray-100 space-y-3">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span><span>{formatRupiah(subtotal)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Diskon (Rp)</span>
            <input
              type="number"
              value={diskon || ''}
              onChange={e => setDiskon(parseInt(e.target.value) || 0)}
              placeholder="0"
              className="w-28 text-right px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-between font-bold text-gray-900 border-t pt-2">
            <span>Total</span><span className="text-blue-600 text-lg">{formatRupiah(total)}</span>
          </div>

          <div className="grid grid-cols-3 gap-1">
            {(['tunai', 'transfer', 'qris'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMetodeBayar(m)}
                className={`py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                  metodeBayar === m
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {metodeBayar === 'tunai' && (
            <div>
              <input
                type="text"
                value={bayar}
                onChange={e => setBayar(e.target.value)}
                placeholder="Nominal bayar..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {bayarNum > 0 && (
                <p className={`text-xs mt-1 ${kembalian >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  Kembalian: {formatRupiah(kembalian)}
                </p>
              )}
              <div className="grid grid-cols-3 gap-1 mt-2">
                {[50000, 100000, 200000].map(n => (
                  <button key={n} onClick={() => setBayar(String(n))}
                    className="text-xs bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded py-1">
                    {formatRupiah(n)}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleSelesai}
            disabled={cart.length === 0 || (metodeBayar === 'tunai' && kembalian < 0)}
            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-40 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            Selesaikan Transaksi
          </button>
        </div>
      </div>
    </div>
  )
}
