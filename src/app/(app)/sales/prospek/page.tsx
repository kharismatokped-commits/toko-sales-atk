'use client'

import { useState, useMemo } from 'react'
import { useStore } from '@/lib/context/store-context'
import { useToast } from '@/lib/context/toast-context'
import { useAuth } from '@/lib/context/auth-context'
import { Prospek } from '@/lib/types'
import { Search, Plus, Phone, MapPin, Tag, X } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'

const statusConfig: Record<Prospek['status'], { label: string; color: string }> = {
  baru: { label: 'Baru', color: 'bg-blue-100 text-blue-700' },
  follow_up: { label: 'Follow Up', color: 'bg-amber-100 text-amber-700' },
  converted: { label: 'Jadi Pelanggan', color: 'bg-green-100 text-green-700' },
  tidak_aktif: { label: 'Tidak Aktif', color: 'bg-gray-100 text-gray-500' },
}

export default function ProspekPage() {
  const { prospek, setProspek, wilayah } = useStore()
  const { showToast } = useToast()
  const { user } = useAuth()

  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('semua')
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Form State
  const [formData, setFormData] = useState({
    nama: '',
    alamat: '',
    kontak: '',
    wilayah_id: '',
    status: 'baru' as Prospek['status'],
    catatan: ''
  })

  const myWilayah = wilayah.find(w => w.sales_id === user?.id)
  const isSupervisor = user?.role === 'supervisor' || user?.role === 'owner'

  const handleOpenAdd = () => {
    setFormData({
      nama: '',
      alamat: '',
      kontak: '',
      wilayah_id: myWilayah?.id || (wilayah[0]?.id || 'w1'),
      status: 'baru',
      catatan: ''
    })
    setIsModalOpen(true)
  }

  const handleSaveProspek = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.nama.trim()) return

    const newP: Prospek = {
      id: 'pr-' + Math.random().toString(36).substring(2, 9),
      nama: formData.nama,
      alamat: formData.alamat || 'Alamat belum diatur',
      kontak: formData.kontak || '-',
      wilayah_id: formData.wilayah_id || myWilayah?.id || 'w1',
      status: formData.status,
      catatan: formData.catatan
    }

    setProspek(prev => [newP, ...prev])
    showToast(`Prospek toko "${formData.nama}" berhasil ditambahkan!`, 'success')
    setIsModalOpen(false)
  }

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
        <button 
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
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

      {/* Modal Tambah Prospek */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Tambah Data Prospek Baru"
      >
        <form onSubmit={handleSaveProspek} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Nama Toko / Usaha / Mitra ATK *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Toko ATK Ceria Mandiri"
              value={formData.nama}
              onChange={e => setFormData({ ...formData, nama: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Alamat Lengkap *
            </label>
            <textarea
              required
              rows={2}
              placeholder="Contoh: Jl. Salemba Tengah No. 20, Jakarta Pusat"
              value={formData.alamat}
              onChange={e => setFormData({ ...formData, alamat: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Kontak / No. WhatsApp
              </label>
              <input
                type="text"
                placeholder="0812-xxxx-xxxx"
                value={formData.kontak}
                onChange={e => setFormData({ ...formData, kontak: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Wilayah Sales
              </label>
              <select
                value={formData.wilayah_id}
                onChange={e => setFormData({ ...formData, wilayah_id: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              >
                {wilayah.map(w => (
                  <option key={w.id} value={w.id}>
                    {w.nama} ({w.sales_nama})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Status Prospek Awal
              </label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              >
                <option value="baru">Baru</option>
                <option value="follow_up">Follow Up</option>
                <option value="converted">Jadi Pelanggan</option>
                <option value="tidak_aktif">Tidak Aktif</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Catatan Kebutuhan ATK
              </label>
              <input
                type="text"
                placeholder="Contoh: Butuh pulpen Faster, spidol whiteboard..."
                value={formData.catatan}
                onChange={e => setFormData({ ...formData, catatan: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 py-2.5 border border-gray-300 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow transition-colors"
            >
              Simpan Prospek
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
