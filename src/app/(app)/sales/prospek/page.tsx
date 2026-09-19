'use client'

import { useState, useMemo } from 'react'
import { useStore } from '@/lib/context/store-context'

import { useAuth } from '@/lib/context/auth-context'
import { Prospek } from '@/lib/types'
import { Search, Plus, Phone, MapPin, Tag } from 'lucide-react'

const statusConfig: Record<Prospek['status'], { label: string; color: string }> = {
  baru: { label: 'Baru', color: 'bg-blue-100 text-blue-700' },
  follow_up: { label: 'Follow Up', color: 'bg-amber-100 text-amber-700' },
  converted: { label: 'Jadi Pelanggan', color: 'bg-green-100 text-green-700' },
  tidak_aktif: { label: 'Tidak Aktif', color: 'bg-gray-100 text-gray-500' },
}

export default function ProspekPage() {
  const { products, setProducts, transaksi, setTransaksi, pelanggan, setPelanggan, pembelian, setPembelian, salesVisit, setSalesVisit, prospek, setProspek, suppliers, setSuppliers, wilayah, setWilayah, users, setUsers } = useStore()


  const { user } = useAuth()
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('semua')

  const myWilayah = wilayah.find(w => w.sales_id === user?.id)
  const isSupervisor = user?.role === 'supervisor' || user?.role === 'owner'

  const filtered = useMemo(() => {
    return prospek.filter(p => {
      if (!isSupervisor && myWilayah && p.wilayah_id !== myWilayah.id) return false
      const matchSearch = p.nama.toLowerCase().includes(search.toLowerCase()) ||
        p.alamat.toLowerCase().includes(search.toLowerCase())
      const matchStatus = filterStatus === 'semua' || p.status === filterStatus
      return matchSearch && matchStatus
    })
  }, [search, filterStatus, isSupervisor, myWilayah, prospek])

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Prospek</h1>
          <p className="text-gray-500 text-sm">{filtered.length} prospek {isSupervisor ? 'semua wilayah' : `di ${myWilayah?.nama || ''}`}</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" />
          Tambah Prospek
        </button>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari nama atau alamat..."
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none"
        >
          <option value="semua">Semua Status</option>
          {Object.entries(statusConfig).map(([key, cfg]) => (
            <option key={key} value={key}>{cfg.label}</option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        {filtered.map(p => {
          const pWilayah = wilayah.find(w => w.id === p.wilayah_id)
          const status = statusConfig[p.status]
          return (
            <div key={p.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-start gap-4 hover:shadow-sm transition-shadow">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold text-sm flex-shrink-0">
                {p.nama.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-gray-900">{p.nama}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${status.color}`}>
                    {status.label}
                  </span>
                </div>
                <div className="mt-1.5 space-y-1 text-xs text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" /><span>{p.alamat}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3 h-3" /><span>{p.kontak}</span>
                  </div>
                  {pWilayah && (
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3 h-3" /><span>{pWilayah.nama} · {pWilayah.sales_nama}</span>
                    </div>
                  )}
                  {p.last_visit && (
                    <p className="text-gray-400">Kunjungan terakhir: {p.last_visit}</p>
                  )}
                </div>
                {p.catatan && <p className="text-xs italic text-gray-400 mt-1.5">"{p.catatan}"</p>}
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center text-gray-400 text-sm">Tidak ada prospek ditemukan</div>
      )}
    </div>
  )
}
