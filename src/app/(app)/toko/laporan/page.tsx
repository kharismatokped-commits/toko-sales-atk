'use client'

import { useState } from 'react'
import { useStore } from '@/lib/context/store-context'

import { formatRupiah } from '@/lib/utils'
import { TrendingUp, ShoppingCart, Package, BarChart3 } from 'lucide-react'

type Range = '7hari' | '30hari' | 'bulan_ini'

export default function LaporanPage() {
  const { products, setProducts, transaksi, setTransaksi, pelanggan, setPelanggan, pembelian, setPembelian, salesVisit, setSalesVisit, prospek, setProspek, suppliers, setSuppliers, wilayah, setWilayah, users, setUsers } = useStore()


  const [range, setRange] = useState<Range>('30hari')

  // Mock summary (nanti hitung dari DB)
  const summary = {
    omzet: transaksi.filter(t => t.status === 'selesai').reduce((s, t) => s + t.total, 0),
    transaksi: transaksi.filter(t => t.status === 'selesai').length,
    avg: 0,
    produk_terjual: transaksi.flatMap(t => t.items).reduce((s, i) => s + i.qty, 0)
  }
  summary.avg = summary.transaksi > 0 ? summary.omzet / summary.transaksi : 0

  // Top produk dari items
  const produkMap: Record<string, { nama: string; qty: number; total: number }> = {}
  transaksi.filter(t => t.status === 'selesai').forEach(t => {
    t.items.forEach(item => {
      if (!produkMap[item.produk_id]) {
        produkMap[item.produk_id] = { nama: item.produk_nama, qty: 0, total: 0 }
      }
      produkMap[item.produk_id].qty += item.qty
      produkMap[item.produk_id].total += item.subtotal
    })
  })
  const topProduk = Object.values(produkMap).sort((a, b) => b.total - a.total).slice(0, 5)

  const rangeLabel: Record<Range, string> = {
    '7hari': '7 Hari Terakhir',
    '30hari': '30 Hari Terakhir',
    'bulan_ini': 'Bulan Ini',
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Laporan</h1>
          <p className="text-gray-500 text-sm">Ringkasan performa toko</p>
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {(Object.keys(rangeLabel) as Range[]).map(r => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                range === r ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {rangeLabel[r]}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Omzet', value: formatRupiah(summary.omzet), icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Jumlah Transaksi', value: String(summary.transaksi), icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Rata-rata Transaksi', value: formatRupiah(summary.avg), icon: BarChart3, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Total Item Terjual', value: String(summary.produk_terjual), icon: Package, color: 'text-orange-600', bg: 'bg-orange-50' },
        ].map(card => (
          <div key={card.label} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className={`w-9 h-9 ${card.bg} rounded-lg flex items-center justify-center mb-3`}>
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </div>
            <p className="text-xl font-bold text-gray-900">{card.value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Produk */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Produk Terlaris</h2>
          </div>
          <div className="p-4 space-y-3">
            {topProduk.map((p, i) => (
              <div key={p.nama} className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  i === 0 ? 'bg-yellow-100 text-yellow-700' :
                  i === 1 ? 'bg-gray-100 text-gray-600' :
                  'bg-orange-50 text-orange-600'
                }`}>{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{p.nama}</p>
                  <p className="text-xs text-gray-500">{p.qty} item terjual</p>
                </div>
                <span className="text-sm font-semibold text-gray-900">{formatRupiah(p.total)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Metode Pembayaran */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Metode Pembayaran</h2>
          </div>
          <div className="p-4 space-y-3">
            {(['tunai', 'transfer', 'qris'] as const).map(m => {
              const trx = transaksi.filter(t => t.metode_bayar === m && t.status === 'selesai')
              const total = trx.reduce((s, t) => s + t.total, 0)
              const pct = summary.omzet > 0 ? (total / summary.omzet * 100).toFixed(0) : '0'
              return (
                <div key={m}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="capitalize font-medium text-gray-700">{m}</span>
                    <span className="text-gray-500">{trx.length} trx · {formatRupiah(total)}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${m === 'tunai' ? 'bg-green-500' : m === 'transfer' ? 'bg-blue-500' : 'bg-purple-500'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{pct}% dari omzet</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Export buttons */}
      <div className="flex gap-3 pt-2">
        <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
          Export PDF
        </button>
        <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
          Export Excel
        </button>
      </div>
    </div>
  )
}
