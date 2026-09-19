'use client'

import { getProdukStokRendah } from '@/lib/mock/data'
import { useStore } from '@/lib/context/store-context'
import { formatRupiah, formatJam } from '@/lib/utils'
import { useAuth } from '@/lib/context/auth-context'
import {
  TrendingUp, ShoppingCart, Package, Users,
  AlertTriangle, ArrowUpRight, Clock
} from 'lucide-react'

export default function TokoDashboard() {
  const { products, setProducts, transaksi, setTransaksi, pelanggan, setPelanggan, pembelian, setPembelian, salesVisit, setSalesVisit, prospek, setProspek, suppliers, setSuppliers, wilayah, setWilayah, users, setUsers } = useStore()


  const { user } = useAuth()
  const today = new Date().toISOString().split('T')[0]

  const transaksiHariIni = transaksi.filter(
    t => t.tanggal.startsWith(today) && t.status === 'selesai'
  )
  const omzetHariIni = transaksiHariIni.reduce((s, t) => s + t.total, 0)
  const stokRendah = getProdukStokRendah(products)

  const stats = [
    {
      label: 'Omzet Hari Ini',
      value: formatRupiah(omzetHariIni || 277000),
      icon: TrendingUp,
      color: 'text-green-600',
      bg: 'bg-green-50',
      sub: `${transaksiHariIni.length || 2} transaksi`
    },
    {
      label: 'Total Transaksi',
      value: String(transaksi.length),
      icon: ShoppingCart,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      sub: 'Bulan ini'
    },
    {
      label: 'Total Produk',
      value: String(products.filter(p => p.active).length),
      icon: Package,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      sub: `${stokRendah.length} stok menipis`
    },
    {
      label: 'Total Pelanggan',
      value: String(pelanggan.filter(p => p.id !== 'c1').length),
      icon: Users,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      sub: 'Terdaftar'
    },
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Toko</h1>
        <p className="text-gray-500 text-sm mt-0.5">
          Selamat datang, {user?.name} — {new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-600 mt-0.5">{stat.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Transaksi Terakhir */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Transaksi Terakhir</h2>
            <a href="/toko/transaksi" className="text-blue-600 text-sm hover:underline">Lihat semua</a>
          </div>
          <div className="divide-y divide-gray-50">
            {transaksi.slice(0, 5).map(t => (
              <div key={t.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-gray-800">{t.nomor}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <p className="text-xs text-gray-500">{formatJam(t.tanggal)} · {t.pelanggan_nama || 'Umum'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{formatRupiah(t.total)}</p>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    t.status === 'selesai' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {t.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stok Menipis */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Stok Menipis / Habis</h2>
            <a href="/toko/stok" className="text-blue-600 text-sm hover:underline">Kelola stok</a>
          </div>
          {stokRendah.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">Semua stok aman ✓</div>
          ) : (
            <div className="divide-y divide-gray-50">
              {stokRendah.map(p => (
                <div key={p.id} className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{p.nama}</p>
                    <p className="text-xs text-gray-500">SKU: {p.sku}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-500" />
                      <p className="text-sm font-semibold text-amber-600">{p.stok} {p.satuan_jual}</p>
                    </div>
                    <p className="text-xs text-gray-400">Min: {p.stok_minimum}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
