'use client'

import { useState, useMemo } from 'react'
import { useStore } from '@/lib/context/store-context'

import { Transaksi } from '@/lib/types'
import { formatRupiah, formatTanggal, formatJam } from '@/lib/utils'
import { Search, Plus, Eye, ShoppingCart } from 'lucide-react'
import Link from 'next/link'

export default function TransaksiPage() {
  const { products, setProducts, transaksi, setTransaksi, pelanggan, setPelanggan, pembelian, setPembelian, salesVisit, setSalesVisit, prospek, setProspek, suppliers, setSuppliers, wilayah, setWilayah, users, setUsers } = useStore()


  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('semua')
  const [selected, setSelected] = useState<Transaksi | null>(null)

  const filtered = useMemo(() => {
    return transaksi.filter(t => {
      const matchSearch = t.nomor.toLowerCase().includes(search.toLowerCase()) ||
        (t.pelanggan_nama || '').toLowerCase().includes(search.toLowerCase())
      const matchStatus = filterStatus === 'semua' || t.status === filterStatus
      return matchSearch && matchStatus
    })
  }, [search, filterStatus])

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transaksi</h1>
          <p className="text-gray-500 text-sm">{transaksi.length} transaksi total</p>
        </div>
        <Link
          href="/toko/transaksi/baru"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Transaksi Baru
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari nomor atau pelanggan..."
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="semua">Semua Status</option>
          <option value="selesai">Selesai</option>
          <option value="batal">Batal</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Nomor</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Waktu</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Pelanggan</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Kasir</th>
                <th className="text-center px-4 py-3 font-medium text-gray-600">Bayar</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Total</th>
                <th className="text-center px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">{t.nomor}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    <p>{formatJam(t.tanggal)}</p>
                    <p className="text-xs text-gray-400">{formatTanggal(t.tanggal)}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{t.pelanggan_nama || 'Umum / Tunai'}</td>
                  <td className="px-4 py-3 text-gray-600">{t.kasir_nama}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full capitalize">
                      {t.metode_bayar}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-900">{formatRupiah(t.total)}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      t.status === 'selesai' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => setSelected(t)}
                      className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <ShoppingCart className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-400 text-sm">Belum ada transaksi</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div>
                <p className="font-semibold text-gray-900">{selected.nomor}</p>
                <p className="text-sm text-gray-500">{formatTanggal(selected.tanggal)} · {formatJam(selected.tanggal)}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-gray-500">Kasir</p><p className="font-medium">{selected.kasir_nama}</p></div>
                <div><p className="text-gray-500">Pelanggan</p><p className="font-medium">{selected.pelanggan_nama || 'Umum'}</p></div>
                <div><p className="text-gray-500">Pembayaran</p><p className="font-medium capitalize">{selected.metode_bayar}</p></div>
                <div><p className="text-gray-500">Status</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    selected.status === 'selesai' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>{selected.status}</span>
                </div>
              </div>

              <div className="border border-gray-100 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-3 py-2 text-gray-600 font-medium">Produk</th>
                      <th className="text-center px-3 py-2 text-gray-600 font-medium">Qty</th>
                      <th className="text-right px-3 py-2 text-gray-600 font-medium">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {selected.items.map(item => (
                      <tr key={item.id}>
                        <td className="px-3 py-2">{item.produk_nama}</td>
                        <td className="px-3 py-2 text-center">{item.qty} {item.satuan}</td>
                        <td className="px-3 py-2 text-right font-medium">{formatRupiah(item.subtotal)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{formatRupiah(selected.subtotal)}</span></div>
                {selected.diskon > 0 && <div className="flex justify-between text-red-600"><span>Diskon</span><span>-{formatRupiah(selected.diskon)}</span></div>}
                <div className="flex justify-between font-bold text-gray-900 border-t pt-1.5"><span>Total</span><span>{formatRupiah(selected.total)}</span></div>
                <div className="flex justify-between text-gray-600"><span>Bayar</span><span>{formatRupiah(selected.bayar)}</span></div>
                <div className="flex justify-between text-green-600"><span>Kembalian</span><span>{formatRupiah(selected.kembalian)}</span></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
