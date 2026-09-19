'use client'

import { useStore } from '@/lib/context/store-context'

import { useAuth } from '@/lib/context/auth-context'
import { Calendar, Clock, MapPin, CheckCircle } from 'lucide-react'

export default function JadwalPage() {
  const { products, setProducts, transaksi, setTransaksi, pelanggan, setPelanggan, pembelian, setPembelian, salesVisit, setSalesVisit, prospek, setProspek, suppliers, setSuppliers, wilayah, setWilayah, users, setUsers } = useStore()


  const { user } = useAuth()
  const isSupervisor = user?.role === 'supervisor'

  const visits = isSupervisor
    ? salesVisit
    : salesVisit.filter(v => v.sales_id === user?.id)

  const grouped = visits.reduce<Record<string, typeof visits>>((acc, v) => {
    if (!acc[v.tanggal]) acc[v.tanggal] = []
    acc[v.tanggal].push(v)
    return acc
  }, {})

  const dates = Object.keys(grouped).sort().reverse()

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {isSupervisor ? 'Kelola Jadwal' : 'Jadwal Kunjungan'}
        </h1>
        <p className="text-gray-500 text-sm">{visits.length} kunjungan total</p>
      </div>

      {dates.map(date => (
        <div key={date} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-100">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-semibold text-gray-700">
              {new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(date))}
            </span>
            <span className="ml-auto text-xs text-gray-400">{grouped[date].length} kunjungan</span>
          </div>
          <div className="divide-y divide-gray-50">
            {grouped[date].map(v => (
              <div key={v.id} className="flex items-center gap-4 px-4 py-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  v.status === 'selesai' ? 'bg-green-100' : 'bg-blue-50'
                }`}>
                  {v.status === 'selesai'
                    ? <CheckCircle className="w-4 h-4 text-green-600" />
                    : <MapPin className="w-4 h-4 text-blue-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{v.prospek_nama}</p>
                  <p className="text-xs text-gray-500">{v.sales_nama}</p>
                </div>
                {v.jam_checkin && (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    {v.jam_checkin}
                  </div>
                )}
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  v.status === 'selesai' ? 'bg-green-100 text-green-700' :
                  v.status === 'dijadwalkan' ? 'bg-gray-100 text-gray-600' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {v.status === 'dijadwalkan' ? 'Dijadwalkan' :
                   v.status === 'checkin' ? 'Check-in' : 'Selesai'}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {dates.length === 0 && (
        <div className="py-16 text-center text-gray-400 text-sm">
          <Calendar className="w-10 h-10 mx-auto mb-2 text-gray-300" />
          Belum ada jadwal
        </div>
      )}
    </div>
  )
}
