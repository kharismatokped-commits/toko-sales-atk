'use client'

import { useState, useMemo } from 'react'
import { useStore } from '@/lib/context/store-context'

import { Pelanggan } from '@/lib/types'
import { formatRupiah, formatTanggal } from '@/lib/utils'
import { Search, Plus, Phone, MapPin, Tag } from 'lucide-react'

export default function PelangganPage() {
  const { products, setProducts, transaksi, setTransaksi, pelanggan, setPelanggan, pembelian, setPembelian, salesVisit, setSalesVisit, prospek, setProspek, suppliers, setSuppliers, wilayah, setWilayah, users, setUsers } = useStore()


  const [search, setSearch] = useState('')
  const [filterTipe, setFilterTipe] = useState('semua')

  const filtered = useMemo(() => {
    return pelanggan.filter(p => {
      if (p.id === 'c1') return false // skip "Umum"
      const matchSearch = p.nama.toLowerCase().includes(search.toLowerCase()) ||
        p.telepon.includes(search)
      const matchTipe = filterTipe === 'semua' || p.tipe === filterTipe
      return matchSearch && matchTipe
    })
  }, [search, filterTipe])

  const typeBadge = (tipe: Pelanggan['tipe']) =>
    tipe === 'grosir'
      ? 'bg-purple-100 text-purple-700'
      : 'bg-blue-100 text-blue-700'

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pelanggan</h1>
          <p className="text-gray-500 text-sm">{filtered.length} pelanggan terdaftar</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" />
          Tambah Pelanggan
        </button>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari nama atau telepon..."
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={filterTipe}
          onChange={e => setFilterTipe(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none"
        >
          <option value="semua">Semua Tipe</option>
          <option value="grosir">Grosir</option>
          <option value="eceran">Eceran</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(p => (
          <div key={p.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-gray-900">{p.nama}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${typeBadge(p.tipe)}`}>
                  {p.tipe}
                </span>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold text-sm flex-shrink-0">
                {p.nama.charAt(0)}
              </div>
            </div>

            <div className="space-y-1.5 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
                <span>{p.telepon}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span className="truncate">{p.alamat}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-gray-400" />
                <span>Total belanja: <strong>{formatRupiah(p.total_pembelian)}</strong></span>
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-3 pt-3 border-t border-gray-100">
              Bergabung: {formatTanggal(p.created_at)}
            </p>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center text-gray-400 text-sm">Tidak ada pelanggan ditemukan</div>
      )}
    </div>
  )
}
