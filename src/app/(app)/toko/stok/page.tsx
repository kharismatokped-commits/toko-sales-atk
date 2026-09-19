'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useStore } from '@/lib/context/store-context'
import { useToast } from '@/lib/context/toast-context'
import { Produk } from '@/lib/types'
import { formatRupiah } from '@/lib/utils'
import { Search, Plus, AlertTriangle, CheckCircle, Edit2, Trash2, Package, Tag, ArrowUpDown, Barcode } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'

export default function StokPage() {
  const { products, setProducts, suppliers } = useStore()
  const { showToast } = useToast()

  const [search, setSearch] = useState('')
  const [filterKategori, setFilterKategori] = useState('semua')
  const [filterStatus, setFilterStatus] = useState('semua')

  // Modal CRUD state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Produk | null>(null)
  const [deleteProduct, setDeleteProduct] = useState<Produk | null>(null)

  // Form State
  const [formData, setFormData] = useState({
    nama: '',
    sku: '',
    kategori: 'Pulpen, Pensil & Spidol',
    satuan_beli: 'pak',
    satuan_jual: 'pcs',
    konversi: 12,
    harga_beli: 0,
    harga_jual: 0,
    stok: 100,
    stok_minimum: 20,
    supplier_id: 's1',
    keterangan: '',
    image: '',
  })

  const kategoriList = useMemo(() => {
    const all = products.map(p => p.kategori)
    return ['semua', ...Array.from(new Set(all))]
  }, [products])

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
  }, [search, filterKategori, filterStatus, products])

  const stokStatus = (p: Produk) => {
    if (p.stok === 0) return { label: 'Habis', color: 'bg-red-100 text-red-700' }
    if (p.stok <= p.stok_minimum) return { label: 'Menipis', color: 'bg-amber-100 text-amber-700' }
    return { label: 'Aman', color: 'bg-green-100 text-green-700' }
  }

  const handleOpenAdd = () => {
    setEditingProduct(null)
    setFormData({
      nama: '',
      sku: `ATK-${String(products.length + 1).padStart(3, '0')}`,
      kategori: 'Pulpen, Pensil & Spidol',
      satuan_beli: 'pak',
      satuan_jual: 'pcs',
      konversi: 12,
      harga_beli: 15000,
      harga_jual: 18000,
      stok: 60,
      stok_minimum: 12,
      supplier_id: suppliers[0]?.id || 's1',
      keterangan: '',
      image: '',
    })
    setIsModalOpen(true)
  }

  const handleOpenEdit = (p: Produk) => {
    setEditingProduct(p)
    setFormData({
      nama: p.nama,
      sku: p.sku,
      kategori: p.kategori,
      satuan_beli: p.satuan_beli,
      satuan_jual: p.satuan_jual,
      konversi: p.konversi,
      harga_beli: p.harga_beli,
      harga_jual: p.harga_jual,
      stok: p.stok,
      stok_minimum: p.stok_minimum,
      supplier_id: p.supplier_id,
      keterangan: p.keterangan || '',
      image: p.image || '',
    })
    setIsModalOpen(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.nama.trim()) {
      showToast('Nama produk wajib diisi', 'error')
      return
    }

    if (editingProduct) {
      // Edit
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? {
        ...p,
        ...formData,
        konversi: Number(formData.konversi) || 1,
        harga_beli: Number(formData.harga_beli) || 0,
        harga_jual: Number(formData.harga_jual) || 0,
        stok: Number(formData.stok) || 0,
        stok_minimum: Number(formData.stok_minimum) || 0,
      } : p))
      showToast(`Produk ${formData.nama} berhasil diperbarui`, 'success')
    } else {
      // Tambah Baru
      const newProd: Produk = {
        id: `prod-${Date.now()}`,
        ...formData,
        konversi: Number(formData.konversi) || 1,
        harga_beli: Number(formData.harga_beli) || 0,
        harga_jual: Number(formData.harga_jual) || 0,
        stok: Number(formData.stok) || 0,
        stok_minimum: Number(formData.stok_minimum) || 0,
        active: true
      }
      setProducts(prev => [newProd, ...prev])
      showToast(`Produk ${formData.nama} berhasil ditambahkan ke katalog`, 'success')
    }
    setIsModalOpen(false)
  }

  const handleDelete = () => {
    if (!deleteProduct) return
    setProducts(prev => prev.filter(p => p.id !== deleteProduct.id))
    showToast(`Produk ${deleteProduct.nama} berhasil dihapus`, 'info')
    setDeleteProduct(null)
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-5 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <Package className="w-7 h-7 text-blue-600" />
            Katalog & Stok Produk ATK
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm">KHALIFA NIAGA · {products.length} item aktif terdaftar</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/toko/barcode"
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 px-3.5 py-2.5 rounded-xl text-sm font-semibold shadow-xs transition-all"
          >
            <Barcode className="w-4 h-4 text-purple-600" />
            <span>Cetak Barcode</span>
          </Link>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            Tambah Produk Baru
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: 'Total Produk ATK', value: products.length, color: 'text-blue-700', bg: 'bg-blue-50/80 border-blue-100', icon: Tag },
          { label: 'Stok Menipis', value: products.filter(p => p.stok <= p.stok_minimum && p.stok > 0).length, color: 'text-amber-700', bg: 'bg-amber-50/80 border-amber-100', icon: AlertTriangle },
          { label: 'Stok Habis (Kosong)', value: products.filter(p => p.stok === 0).length, color: 'text-red-700', bg: 'bg-red-50/80 border-red-100', icon: AlertTriangle },
        ].map(c => {
          const Icon = c.icon
          return (
            <div key={c.label} className={`${c.bg} border rounded-2xl p-4 flex items-center justify-between shadow-xs`}>
              <div>
                <p className="text-xs text-gray-600 font-medium">{c.label}</p>
                <p className={`text-2xl font-black ${c.color} mt-0.5`}>{c.value}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center shadow-xs">
                <Icon className={`w-5 h-5 ${c.color}`} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari nama produk, kode SKU, atau merk..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-xs"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterKategori}
            onChange={e => setFilterKategori(e.target.value)}
            className="px-3 py-2.5 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-medium"
          >
            {kategoriList.map(k => (
              <option key={k} value={k}>{k === 'semua' ? 'Semua Kategori' : k}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-3 py-2.5 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-medium"
          >
            <option value="semua">Semua Status Stok</option>
            <option value="aman">Stok Aman</option>
            <option value="menipis">Menipis / Habis</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50/80 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3.5 font-semibold text-gray-700">Produk ATK</th>
                <th className="text-left px-4 py-3.5 font-semibold text-gray-700">Kategori</th>
                <th className="text-left px-4 py-3.5 font-semibold text-gray-700">Satuan Beli / Jual</th>
                <th className="text-right px-4 py-3.5 font-semibold text-gray-700">Harga Jual</th>
                <th className="text-right px-4 py-3.5 font-semibold text-gray-700">Sisa Stok</th>
                <th className="text-center px-4 py-3.5 font-semibold text-gray-700">Status</th>
                <th className="text-center px-4 py-3.5 font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(p => {
                const status = stokStatus(p)
                return (
                  <tr key={p.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={p.nama}
                            className="w-11 h-11 object-contain rounded-xl border border-gray-100 bg-white p-1 flex-shrink-0 shadow-xs"
                          />
                        ) : (
                          <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-xs font-bold text-blue-600 flex-shrink-0">
                            ATK
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-bold text-gray-900 leading-snug">{p.nama}</p>
                          <p className="text-xs text-gray-400 font-mono mt-0.5">{p.sku}</p>
                          {p.keterangan && (
                            <p className="text-[11px] text-blue-600 truncate max-w-xs mt-0.5">{p.keterangan}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{p.kategori}</td>
                    <td className="px-4 py-3 text-xs">
                      <span className="font-medium text-gray-800">{p.satuan_jual}</span>
                      <p className="text-[11px] text-gray-400">1 {p.satuan_beli} = {p.konversi} {p.satuan_jual}</p>
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-gray-900">{formatRupiah(p.harga_jual)}</td>
                    <td className="px-4 py-3 text-right">
                      <span className={`font-black text-sm ${p.stok <= p.stok_minimum ? 'text-red-600' : 'text-gray-900'}`}>
                        {p.stok}
                      </span>
                      <span className="text-xs text-gray-400 ml-1">{p.satuan_jual}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-bold ${status.color}`}>
                        {p.stok <= p.stok_minimum
                          ? <AlertTriangle className="w-3 h-3" />
                          : <CheckCircle className="w-3 h-3" />}
                        {status.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                          title="Edit Produk"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteProduct(p)}
                          className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                          title="Hapus Produk"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-16 text-center text-gray-400 text-sm">
            <Package className="w-10 h-10 mx-auto text-gray-300 mb-2" />
            Tidak ada produk ATK yang sesuai filter pencarian
          </div>
        )}
      </div>

      {/* Modal CRUD Produk */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? 'Edit Data Produk ATK' : 'Tambah Produk ATK Baru'}
        size="lg"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1">Nama Produk ATK *</label>
              <input
                type="text"
                value={formData.nama}
                onChange={e => setFormData({ ...formData, nama: e.target.value })}
                placeholder="Contoh: PULPEN FASTER F3 HITAM"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Kode SKU / Barcode *</label>
              <input
                type="text"
                value={formData.sku}
                onChange={e => setFormData({ ...formData, sku: e.target.value })}
                placeholder="ATK-001"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Kategori</label>
              <input
                type="text"
                value={formData.kategori}
                onChange={e => setFormData({ ...formData, kategori: e.target.value })}
                placeholder="Pulpen, Pensil & Spidol"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Satuan Beli (Grosir)</label>
              <input
                type="text"
                value={formData.satuan_beli}
                onChange={e => setFormData({ ...formData, satuan_beli: e.target.value })}
                placeholder="pak / kotak / karton"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Satuan Jual (Eceran)</label>
              <input
                type="text"
                value={formData.satuan_jual}
                onChange={e => setFormData({ ...formData, satuan_jual: e.target.value })}
                placeholder="pcs / lusin"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Konversi (Isi per Satuan Beli)</label>
              <input
                type="number"
                value={formData.konversi}
                onChange={e => setFormData({ ...formData, konversi: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <p className="text-[10px] text-gray-400 mt-0.5">Contoh: 1 pak = 12 pcs</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Harga Jual (Rp / Satuan Jual)</label>
              <input
                type="number"
                value={formData.harga_jual}
                onChange={e => setFormData({ ...formData, harga_jual: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-bold text-blue-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Jumlah Stok Saat Ini</label>
              <input
                type="number"
                value={formData.stok}
                onChange={e => setFormData({ ...formData, stok: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Batas Minimum Stok</label>
              <input
                type="number"
                value={formData.stok_minimum}
                onChange={e => setFormData({ ...formData, stok_minimum: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1">Keterangan / Promo</label>
              <input
                type="text"
                value={formData.keterangan}
                onChange={e => setFormData({ ...formData, keterangan: e.target.value })}
                placeholder="Diskon Tersedia / Promo grosir"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
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
              {editingProduct ? 'Simpan Perubahan' : 'Tambah Produk'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deleteProduct}
        onClose={() => setDeleteProduct(null)}
        onConfirm={handleDelete}
        title="Hapus Produk ATK"
        message={`Apakah Anda yakin ingin menghapus "${deleteProduct?.nama}" dari katalog?`}
        confirmLabel="Ya, Hapus"
        danger
      />
    </div>
  )
}
