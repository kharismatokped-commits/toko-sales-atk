'use client'

import { useStore } from '@/lib/context/store-context'

import { CheckCircle, Clock, XCircle, MapPin, TrendingUp } from 'lucide-react'

export default function MonitorSalesPage() {
  const { products, setProducts, transaksi, setTransaksi, pelanggan, setPelanggan, pembelian, setPembelian, salesVisit, setSalesVisit, prospek, setProspek, suppliers, setSuppliers, wilayah, setWilayah, users, setUsers } = useStore()


  const salesUsers = users.filter(u => u.role === 'sales')

  const getStats = (salesId: string) => {
    const visits = salesVisit.filter(v => v.sales_id === salesId)
    return {
      total: visits.length,
      selesai: visits.filter(v => v.status === 'selesai').length,
      order: visits.filter(v => v.hasil === 'order').length,
      dijadwalkan: visits.filter(v => v.status === 'dijadwalkan').length,
    }
  }

  const wilayahOf = (salesId: string) =>
    wilayah.find(w => w.sales_id === salesId)

  const totalVisits = salesVisit.length
  const totalDone = salesVisit.filter(v => v.status === 'selesai').length
  const totalOrder = salesVisit.filter(v => v.hasil === 'order').length

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Monitor Sales</h1>
        <p className="text-gray-500 text-sm">Pantau performa semua sales hari ini</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Kunjungan Dijadwalkan', value: totalVisits, icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Kunjungan Selesai', value: totalDone, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Total Order', value: totalOrder, icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className={`w-9 h-9 ${s.bg} rounded-lg flex items-center justify-center mb-2`}>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Per Sales Card */}
      <div className="grid md:grid-cols-2 gap-4">
        {salesUsers.map(sales => {
          const stats = getStats(sales.id)
          const wilayah = wilayahOf(sales.id)
          const pct = stats.total > 0 ? Math.round(stats.selesai / stats.total * 100) : 0
          const visits = salesVisit.filter(v => v.sales_id === sales.id)

          return (
            <div key={sales.id} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {sales.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{sales.name}</p>
                  <p className="text-xs text-gray-500">{wilayah?.nama || 'Tanpa wilayah'}</p>
                </div>
                <div className={`ml-auto w-2 h-2 rounded-full ${
                  stats.selesai > 0 ? 'bg-green-500' : 'bg-gray-300'
                }`} title={stats.selesai > 0 ? 'Aktif' : 'Belum aktif'} />
              </div>

              {/* Progress bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Realisasi kunjungan</span>
                  <span>{stats.selesai}/{stats.total} ({pct}%)</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      pct >= 80 ? 'bg-green-500' : pct >= 50 ? 'bg-amber-500' : 'bg-red-400'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { label: 'Dijadwalkan', val: stats.dijadwalkan, color: 'text-gray-600' },
                  { label: 'Selesai', val: stats.selesai, color: 'text-green-600' },
                  { label: 'Order', val: stats.order, color: 'text-blue-600' },
                ].map(s => (
                  <div key={s.label} className="text-center bg-gray-50 rounded-lg py-2">
                    <p className={`text-lg font-bold ${s.color}`}>{s.val}</p>
                    <p className="text-xs text-gray-500">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Recent visits */}
              <div className="space-y-1.5">
                {visits.slice(0, 3).map(v => (
                  <div key={v.id} className="flex items-center gap-2 text-xs">
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                      v.status === 'selesai' ? (v.hasil === 'order' ? 'bg-green-500' : 'bg-gray-400') :
                      'bg-blue-300'
                    }`} />
                    <span className="text-gray-700 flex-1 truncate">{v.prospek_nama}</span>
                    <span className={`${v.hasil === 'order' ? 'text-green-600 font-medium' : 'text-gray-400'}`}>
                      {v.status === 'selesai' ? (v.hasil === 'order' ? 'Order ✓' : 'Selesai') : 'Dijadwalkan'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
