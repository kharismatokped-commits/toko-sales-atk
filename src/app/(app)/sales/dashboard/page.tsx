'use client'

import { useAuth } from '@/lib/context/auth-context'
import { useStore } from '@/lib/context/store-context'

import { MapPin, Clock, CheckCircle, Calendar, TrendingUp, ShoppingBag } from 'lucide-react'

export default function SalesDashboard() {
  const { salesVisit, wilayah } = useStore()
  const { user } = useAuth()

  // Pastikan akun sales selalu terikat ke profil sales aktif (default Ahmad Sales jika login tanpa ID spesifik)
  const activeSalesId = (user?.id && ['u3', 'u4', 'u5', 'u6'].includes(user.id)) ? user.id : 'u3'
  const myVisits = salesVisit.filter(v => v.sales_id === activeSalesId)

  // Tanggal lokal hari ini YYYY-MM-DD
  const now = new Date()
  const localToday = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  const todayVisits = myVisits.filter(v => v.tanggal === localToday)
  const displayVisits = todayVisits.length > 0 ? todayVisits : myVisits

  const currentWilayah = wilayah.find(w => w.sales_id === activeSalesId) || wilayah[0]

  const selesai = myVisits.filter(v => v.status === 'selesai').length
  const order = myVisits.filter(v => v.hasil === 'order').length

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Sales</h1>
        <p className="text-gray-500 text-sm">
          {currentWilayah ? `Wilayah: ${currentWilayah.nama}` : ''} · {new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Kunjungan Hari Ini', value: todayVisits.length, icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Total Selesai', value: selesai, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Order Didapat', value: order, icon: ShoppingBag, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className={`w-9 h-9 ${s.bg} rounded-lg flex items-center justify-center mb-2`}>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Jadwal Hari Ini */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Jadwal Hari Ini</h2>
          <a href="/sales/jadwal" className="text-blue-600 text-sm hover:underline">Lihat semua</a>
        </div>
        {displayVisits.length === 0 ? (
          <div className="py-10 text-center text-gray-400 text-sm">
            Belum ada kunjungan dijadwalkan hari ini
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {displayVisits.map(v => (
              <div key={v.id} className="flex items-center gap-4 px-4 py-3">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  v.status === 'selesai' ? 'bg-green-500' :
                  v.status === 'checkin' ? 'bg-blue-500' :
                  'bg-gray-300'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{v.prospek_nama}</p>
                  {v.jam_checkin && (
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      Check-in: {v.jam_checkin}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    v.status === 'selesai' ? 'bg-green-100 text-green-700' :
                    v.status === 'checkin' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {v.status === 'dijadwalkan' ? 'Dijadwalkan' :
                     v.status === 'checkin' ? 'Check-in' : 'Selesai'}
                  </span>
                  {v.hasil && (
                    <p className={`text-xs mt-0.5 ${v.hasil === 'order' ? 'text-green-600' : 'text-gray-400'}`}>
                      {v.hasil === 'order' ? '✓ Ada order' : '✗ Tidak order'}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick action: Check-in */}
      <div className="bg-blue-600 rounded-xl p-5 text-white">
        <div className="flex items-start gap-3">
          <MapPin className="w-6 h-6 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-semibold">Mulai Kunjungan</p>
            <p className="text-blue-200 text-sm mt-0.5">Pilih toko & lakukan check-in GPS</p>
          </div>
        </div>
        <a
          href="/sales/kunjungan"
          className="mt-4 block text-center bg-white text-blue-600 font-semibold py-2.5 rounded-xl hover:bg-blue-50 transition-colors text-sm"
        >
          Check-in Sekarang
        </a>
      </div>
    </div>
  )
}
