'use client'

import { useState, useMemo } from 'react'
import { useStore } from '@/lib/context/store-context'
import { useToast } from '@/lib/context/toast-context'
import { Pelanggan } from '@/lib/types'
import { formatRupiah, formatTanggal } from '@/lib/utils'
import { Search, Plus, Phone, MapPin, Tag, Edit2, Trash2, Users } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'

export default function PelangganPage() {
  const { pelanggan, setPelanggan } = useStore()
  const { showToast } = useToast()

  const [search, setSearch] = useState('')
  const [filterTipe, setFilterTipe] = useState('semua')

  // Modal CRUD State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPelanggan, setEditingPelanggan] = useState<Pelanggan | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Pelanggan | null>(null)

  const [formData, setFormData] = useState({
    nama: '',
    telepon: '',
    alamat: '',
    tipe: 'grosir' as 'grosir' | 'eceran',
    total_pembelian: 0
  })

  const filtered = useMemo(() => {
    return pelanggan.filter(p => {
      if (p.id === 'c1') return false // skip "Umum"
      const matchSearch = p.nama.toLowerCase().includes(search.toLowerCase()) ||
        p.telepon.includes(search)
      const matchTipe = filterTipe === 'semua' || p.tipe === filterTipe
      return matchSearch && matchTipe
    })
  }, [search, filterTipe, pelanggan])

  const handleOpenAdd = () => {
    setEditingPelanggan(null)
    setFormData({
      nama: '',
      telepon: '',
      alamat: '',
      tipe: 'grosir',
      total_pembelian: 0
    })
    setIsModalOpen(true)
  }

  const handleOpenEdit = (p: Pelanggan) => {
    setEditingPelanggan(p)
    setFormData({
      nama: p.nama,
      telepon: p.telepon,
      alamat: p.alamat,
      tipe: p.tipe,
      total_pembelian: p.total_pembelian
    })
    setIsModalOpen(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.nama.trim()) {
      showToast('Nama pelanggan atau toko wajib diisi', 'error')
      return
    }

    if (editingPelanggan) {
      setPelanggan(prev => prev.map(p => p.id === editingPelanggan.id ? {
        ...p,
        ...formData
      } : p))
      showToast(`Data pelanggan ${formData.nama} berhasil diperbarui`, 'success')
    } else {
      const newCust: Pelanggan = {
        id: `cust-${Date.now()}`,
        ...formData,
        created_at: new Date().toISOString().split('T')[0]
      }
      setPelanggan(prev => [newCust, ...prev])
      showToast(`Pelanggan baru ${formData.nama} berhasil didaftarkan`, 'success')
    }
    setIsModalOpen(false)
  }

  const handleDelete = () => {
    if (!deleteTarget) return
    setPelanggan(prev => prev.filter(p => p.id !== deleteTarget.id))
    showToast(`Pelanggan ${deleteTarget.nama} telah dihapus`, 'info')
    setDeleteTarget(null)
  }

  const typeBadge = (tipe: Pelanggan['tipe']) =>
    tipe === 'grosir'
      ? 'bg-purple-50 border border-purple-200 text-purple-700'
      : 'bg-blue-50 border border-blue-200 text-blue-700'

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-5 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <Users className="w-7 h-7 text-blue-600" />
            Buku Data Pelanggan
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm">KHALIFA NIAGA · {filtered.length} pelanggan terdata</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          Tambah Pelanggan Baru
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari nama toko, pelanggan, atau no telepon..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-xs"
          />
        </div>
        <select
          value={filterTipe}
          onChange={e => setFilterTipe(e.target.value)}
          className="px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs sm:text-sm bg-white font-medium focus:outline-none"
        >
          <option value="semua">Semua Tipe Pelanggan</option>
          <option value="grosir">Toko Grosir</option>
          <option value="eceran">Pelanggan Eceran</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(p => (
          <div key={p.id} className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <p className="font-extrabold text-gray-900 text-base">{p.nama}</p>
                  <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold capitalize mt-1 inline-block ${typeBadge(p.tipe)}`}>
                    {p.tipe === 'grosir' ? '🏪 Grosir' : '🛍️ Eceran'}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(p)}
                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(p)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-gray-600 my-3">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="font-mono">{p.telepon || '-'}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="line-clamp-2 leading-relaxed">{p.alamat || '-'}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Tag className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span>Akumulasi Belanja: <strong className="text-gray-900">{formatRupiah(p.total_pembelian)}</strong></span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 pt-3 border-t border-gray-100 flex justify-between items-center">
              <span>Terdaftar sejak</span>
              <span className="font-medium text-gray-600">{formatTanggal(p.created_at)}</span>
            </p>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center text-gray-400 text-sm">
          <Users className="w-10 h-10 mx-auto text-gray-300 mb-2" />
          Tidak ada pelanggan yang cocok dengan pencarian
        </div>
      )}

      {/* Modal CRUD Pelanggan */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPelanggan ? 'Edit Data Pelanggan' : 'Daftarkan Pelanggan Baru'}
        size="md"
      >
        <form onSubmit={handleSave} className="space-y-4 text-sm">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Nama Toko / Pelanggan *</label>
            <input
              type="text"
              value={formData.nama}
              onChange={e => setFormData({ ...formData, nama: e.target.value })}
              placeholder="Contoh: Toko Berkah Mandiri / Ibu Dewi"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Nomor WhatsApp / Telepon</label>
            <input
              type="text"
              value={formData.telepon}
              onChange={e => setFormData({ ...formData, telepon: e.target.value })}
              placeholder="0812-xxxx-xxxx"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Alamat Lengkap</label>
            <textarea
              rows={2}
              value={formData.alamat}
              onChange={e => setFormData({ ...formData, alamat: e.target.value })}
              placeholder="Jl. Raya Pasar No..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Tipe Pelanggan</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, tipe: 'grosir' })}
                className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all ${
                  formData.tipe === 'grosir'
                    ? 'border-purple-600 bg-purple-50 text-purple-700 shadow-xs'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                🏪 Toko Grosir
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, tipe: 'eceran' })}
                className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all ${
                  formData.tipe === 'eceran'
                    ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-xs'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                🛍️ Eceran Langsung
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-sm"
            >
              {editingPelanggan ? 'Simpan Data' : 'Daftarkan Pelanggan'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Dialog Hapus */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Hapus Pelanggan"
        message={`Apakah Anda yakin ingin menghapus data pelanggan "${deleteTarget?.nama}"?`}
        confirmLabel="Ya, Hapus"
        danger
      />
    </div>
  )
}
