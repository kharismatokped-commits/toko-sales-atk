'use client'

import { useState, useMemo } from 'react'
import { useStore } from '@/lib/context/store-context'

import { Produk } from '@/lib/types'
import { formatRupiah } from '@/lib/utils'
import { Search, Plus, AlertTriangle, CheckCircle, Filter } from 'lucide-react'

export default function StokPage() {
  const { products, setProducts, transaksi, setTransaksi, pelanggan, setPelanggan, pembelian, setPembelian, salesVisit, setSalesVisit, prospek, setProspek, suppliers, setSuppliers, wilayah, setWilayah, users, setUsers } = useStore()


  const [search, setSearch] = useState('')
  const [filterKategori, setFilterKategori] = useState('semua')
  const [filterStatus, setFilterStatus] = useState('semua')

  const kategoriList = useMemo(() => {
    const all = products.map(p => p.kategori)
    return ['semua', ...Array.from(new Set(all))]
  }, [])

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchSearch = p.nama.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase())
      const matchKategori = filterKategori === 'semua' || p.kategori === filterKategori
      const matchStatus = filterStatus === 'semua'
        ? true
        : filterStatus === 'menipis'
          ? p.stok <= p.stok_minimum
          : p.stok > p.stok_minimum
      return matchSearch && matchKategori && matchStatus
    })
  }, [search, filterKategori, filterStatus])

  const stokStatus = (p: Produk) => {
    if (p.stok === 0) return { label: 'Habis', color: 'bg-red-100 text-red-700' }
    if (p.stok <= p.stok_minimum) return { label: 'Menipis', color: 'bg-amber-100 text-amber-700' }
    return { label: 'Aman', color: 'bg-green-100 text-green-700' }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Stok Produk</h1>
          <p className="text-gray-500 text-sm">{products.length} produk terdaftar</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" />
          Tambah Produk
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Produk', value: products.length, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Stok Menipis', value: products.filter(p => p.stok <= p.stok_minimum && p.stok > 0).length, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Stok Habis', value: products.filter(p => p.stok === 0).length, color: 'text-red-600', bg: 'bg-red-50' },
        ].map(c => (
          <div key={c.label} className={`${c.bg} rounded-xl p-4`}>
            <p className={`text-2xl font-bold ${c.color}`}>{c.value}</p>
            <p className="text-sm text-gray-600 mt-0.5">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari nama atau SKU..."
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={filterKategori}
          onChange={e => setFilterKategori(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          {kategoriList.map(k => (
            <option key={k} value={k}>{k === 'semua' ? 'Semua Kategori' : k}</option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="semua">Semua Status</option>
          <option value="aman">Stok Aman</option>
          <option value="menipis">Menipis / Habis</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Produk</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Kategori</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Satuan</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Harga Jual</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Stok</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Min. Stok</th>
                <th className="text-center px-4 py-3 font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(p => {
                const status = stokStatus(p)
                return (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={p.nama}
                            className="w-10 h-10 object-contain rounded-lg border border-gray-100 bg-white p-0.5 flex-shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-400 flex-shrink-0">
                            ATK
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900">{p.nama}</p>
                          <p className="text-xs text-gray-500">{p.sku}</p>
                          {p.keterangan && (
                            <p className="text-[11px] text-blue-600 truncate max-w-xs">{p.keterangan}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{p.kategori}</td>
                    <td className="px-4 py-3">
                      <span className="text-gray-600">{p.satuan_jual}</span>
                      <p className="text-xs text-gray-400">Beli: {p.konversi} {p.satuan_jual}/{p.satuan_beli}</p>
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-gray-900">{formatRupiah(p.harga_jual)}</td>
                    <td className="px-4 py-3 text-right">
                      <span className={`font-semibold ${p.stok <= p.stok_minimum ? 'text-red-600' : 'text-gray-900'}`}>
                        {p.stok}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-500">{p.stok_minimum}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium ${status.color}`}>
                        {p.stok <= p.stok_minimum
                          ? <AlertTriangle className="w-3 h-3" />
                          : <CheckCircle className="w-3 h-3" />}
                        {status.label}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-gray-400 text-sm">Tidak ada produk ditemukan</div>
        )}
      </div>
    </div>
  )
}
