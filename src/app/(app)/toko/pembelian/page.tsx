'use client'

import { useState, useMemo } from 'react'
import { useStore } from '@/lib/context/store-context'

import { PembelianItem } from '@/lib/types'
import { formatRupiah, formatTanggal } from '@/lib/utils'
import { Plus, ChevronDown, ChevronUp, Package, Trash2 } from 'lucide-react'

const statusBadge: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-600',
  approved: 'bg-blue-100 text-blue-700',
  received: 'bg-green-100 text-green-700',
  batal: 'bg-red-100 text-red-700',
}

const statusLabel: Record<string, string> = {
  draft: 'Draft', approved: 'Disetujui', received: 'Diterima', batal: 'Batal'
}

export default function PembelianPage() {
  const { products, setProducts, transaksi, setTransaksi, pelanggan, setPelanggan, pembelian, setPembelian, salesVisit, setSalesVisit, prospek, setProspek, suppliers, setSuppliers, wilayah, setWilayah, users, setUsers } = useStore()


  const [expanded, setExpanded] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)

  // Form state
  const [supplierId, setSupplierId] = useState('')
  const [items, setItems] = useState<Array<{ produk_id: string; qty_karton: number }>>([])
  const [catatan, setCatatan] = useState('')

  const addItem = () => setItems(prev => [...prev, { produk_id: '', qty_karton: 1 }])
  const removeItem = (i: number) => setItems(prev => prev.filter((_, idx) => idx !== i))

  const formTotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const produk = products.find(p => p.id === item.produk_id)
      if (!produk) return sum
      return sum + produk.harga_beli * item.qty_karton
    }, 0)
  }, [items])

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pembelian Grosir</h1>
          <p className="text-gray-500 text-sm">{pembelian.length} purchase order</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Buat PO Baru
        </button>
      </div>

      {/* Form PO Baru */}
      {showForm && (
        <div className="bg-white rounded-xl border border-blue-200 p-5 space-y-4">
          <h2 className="font-semibold text-gray-900">Purchase Order Baru</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Supplier</label>
              <select
                value={supplierId}
                onChange={e => setSupplierId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Pilih supplier...</option>
                {suppliers.map(s => <option key={s.id} value={s.id}>{s.nama}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Catatan</label>
              <input
                value={catatan}
                onChange={e => setCatatan(e.target.value)}
                placeholder="Opsional..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Items */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Item Produk</label>
              <button onClick={addItem} className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                <Plus className="w-3 h-3" /> Tambah item
              </button>
            </div>
            <div className="space-y-2">
              {items.map((item, idx) => {
                const produk = products.find(p => p.id === item.produk_id)
                const qtyPcs = produk ? item.qty_karton * produk.konversi : 0
                const subtotal = produk ? item.qty_karton * produk.harga_beli : 0
                return (
                  <div key={idx} className="grid grid-cols-12 gap-2 items-center bg-gray-50 rounded-lg p-2">
                    <select
                      value={item.produk_id}
                      onChange={e => setItems(prev => prev.map((it, i) => i === idx ? { ...it, produk_id: e.target.value } : it))}
                      className="col-span-5 px-2 py-1.5 border border-gray-200 rounded text-sm bg-white focus:outline-none"
                    >
                      <option value="">Pilih produk...</option>
                      {products.map(p => <option key={p.id} value={p.id}>{p.nama}</option>)}
                    </select>
                    <div className="col-span-2 flex items-center gap-1">
                      <input
                        type="number"
                        min={1}
                        value={item.qty_karton}
                        onChange={e => setItems(prev => prev.map((it, i) => i === idx ? { ...it, qty_karton: parseInt(e.target.value) || 1 } : it))}
                        className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm text-center focus:outline-none"
                      />
                      <span className="text-xs text-gray-500 whitespace-nowrap">{produk?.satuan_beli || 'karton'}</span>
                    </div>
                    <div className="col-span-2 text-xs text-gray-500 text-center">
                      = {qtyPcs} {produk?.satuan_jual || 'pcs'}
                    </div>
                    <div className="col-span-2 text-xs font-medium text-right text-gray-800">
                      {formatRupiah(subtotal)}
                    </div>
                    <button onClick={() => removeItem(idx)} className="col-span-1 flex justify-center text-gray-400 hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )
              })}
              {items.length === 0 && (
                <div className="text-center py-4 text-gray-400 text-sm border border-dashed border-gray-300 rounded-lg">
                  Belum ada item. Klik "Tambah item".
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="text-sm">
              <span className="text-gray-500">Total Estimasi: </span>
              <strong className="text-blue-700 text-base">{formatRupiah(formTotal)}</strong>
              <p className="text-xs text-gray-400 mt-0.5">*Perlu persetujuan Owner via Telegram sebelum diproses</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                Batal
              </button>
              <button
                disabled={!supplierId || items.length === 0}
                onClick={() => { alert('PO dibuat sebagai Draft. Notifikasi dikirim ke Owner.'); setShowForm(false) }}
                className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-lg font-medium transition-colors"
              >
                Kirim ke Owner
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Daftar PO */}
      <div className="space-y-3">
        {pembelian.map(po => (
          <div key={po.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div
              className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setExpanded(expanded === po.id ? null : po.id)}
            >
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{po.nomor}</p>
                  <p className="text-sm text-gray-500">{po.supplier_nama} · {formatTanggal(po.tanggal)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-bold text-gray-900">{formatRupiah(po.total)}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusBadge[po.status]}`}>
                    {statusLabel[po.status]}
                  </span>
                </div>
                {expanded === po.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </div>
            </div>

            {expanded === po.id && (
              <div className="border-t border-gray-100 p-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 text-xs border-b border-gray-100">
                      <th className="pb-2">Produk</th>
                      <th className="pb-2 text-center">Qty (Karton)</th>
                      <th className="pb-2 text-center">Qty (Pcs)</th>
                      <th className="pb-2 text-right">Harga/Karton</th>
                      <th className="pb-2 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {po.items.map(item => (
                      <tr key={item.id}>
                        <td className="py-2">{item.produk_nama}</td>
                        <td className="py-2 text-center">{item.qty_karton}</td>
                        <td className="py-2 text-center text-gray-500">{item.qty_pcs}</td>
                        <td className="py-2 text-right">{formatRupiah(item.harga_beli)}</td>
                        <td className="py-2 text-right font-medium">{formatRupiah(item.subtotal)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-gray-200">
                      <td colSpan={4} className="pt-2 font-semibold text-right text-gray-700">Total</td>
                      <td className="pt-2 text-right font-bold text-blue-700">{formatRupiah(po.total)}</td>
                    </tr>
                  </tfoot>
                </table>
                {po.status === 'draft' && (
                  <div className="mt-3 flex gap-2 justify-end">
                    <button className="px-3 py-1.5 text-xs text-red-600 border border-red-200 rounded-lg hover:bg-red-50">Batalkan</button>
                    <button className="px-3 py-1.5 text-xs bg-green-600 text-white rounded-lg hover:bg-green-700">Tandai Diterima</button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
