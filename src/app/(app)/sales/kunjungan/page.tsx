'use client'

import { useState } from 'react'
import { useStore } from '@/lib/context/store-context'
import { useToast } from '@/lib/context/toast-context'
import { useAuth } from '@/lib/context/auth-context'
import { MapPin, Clock, CheckCircle, FileText, Camera } from 'lucide-react'

export default function KunjunganPage() {
  const { salesVisit, setSalesVisit } = useStore()
  const { showToast } = useToast()
  const { user } = useAuth()

  const [selectedVisit, setSelectedVisit] = useState<string | null>(null)
  const [catatan, setCatatan] = useState('')
  const [hasil, setHasil] = useState<'order' | 'tidak_order' | 'tunda' | ''>('')
  const [checkedIn, setCheckedIn] = useState<string[]>([])

  const myVisits = salesVisit.filter(v => v.sales_id === user?.id)

  const handleCheckin = (visitId: string) => {
    const jamNow = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    setCheckedIn(prev => [...prev, visitId])
    setSelectedVisit(visitId)
    setSalesVisit(prev => prev.map(v => {
      if (v.id === visitId) {
        return {
          ...v,
          status: 'checkin',
          jam_checkin: jamNow,
          lat: -6.1844,
          lng: 106.8456
        }
      }
      return v
    }))
    showToast('Check-in GPS berhasil dicatat pada lokasi toko!', 'success')
  }

  const handleSelesai = () => {
    if (!selectedVisit) return
    const currentTarget = salesVisit.find(v => v.id === selectedVisit)
    setSalesVisit(prev => prev.map(v => {
      if (v.id === selectedVisit) {
        return {
          ...v,
          status: 'selesai',
          hasil: hasil || 'order',
          catatan: catatan || 'Kunjungan selesai dan diserahkan ke sistem.'
        }
      }
      return v
    }))

    showToast(`Laporan kunjungan ${currentTarget?.prospek_nama || ''} berhasil disimpan!`, 'success')
    setSelectedVisit(null)
    setCatatan('')
    setHasil('')
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Kunjungan</h1>
        <p className="text-gray-500 text-sm">Kelola check-in dan laporan kunjungan</p>
      </div>

      <div className="space-y-3">
        {myVisits.map(v => {
          const isCheckedIn = checkedIn.includes(v.id) || v.status === 'checkin'
          const isDone = v.status === 'selesai'
          const isSelected = selectedVisit === v.id

          return (
            <div key={v.id} className={`bg-white rounded-xl border transition-all ${
              isSelected ? 'border-blue-300 shadow-md' : 'border-gray-200'
            }`}>
              <div className="flex items-center gap-4 p-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isDone ? 'bg-green-100' : isCheckedIn ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  {isDone ? <CheckCircle className="w-5 h-5 text-green-600" /> :
                   isCheckedIn ? <Clock className="w-5 h-5 text-blue-600" /> :
                   <MapPin className="w-5 h-5 text-gray-400" />}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{v.prospek_nama}</p>
                  {v.jam_checkin && <p className="text-xs text-gray-500">Check-in: {v.jam_checkin}</p>}
                  {v.catatan && <p className="text-xs text-gray-500 mt-0.5 italic">"{v.catatan}"</p>}
                </div>
                <div className="flex flex-col items-end gap-2">
                  {!isDone && !isCheckedIn && (
                    <button
                      onClick={() => handleCheckin(v.id)}
                      className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-lg font-medium transition-colors"
                    >
                      <MapPin className="w-3 h-3" />
                      Check-in GPS
                    </button>
                  )}
                  {isCheckedIn && !isDone && (
                    <button
                      onClick={() => setSelectedVisit(isSelected ? null : v.id)}
                      className="text-xs border border-gray-300 hover:bg-gray-50 px-3 py-1.5 rounded-lg text-gray-700 transition-colors"
                    >
                      {isSelected ? 'Tutup' : 'Isi Laporan'}
                    </button>
                  )}
                  {isDone && v.hasil && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      v.hasil === 'order' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {v.hasil === 'order' ? '✓ Ada Order' : '✗ Tidak Order'}
                    </span>
                  )}
                </div>
              </div>

              {/* Form laporan */}
              {isSelected && (
                <div className="border-t border-gray-100 p-4 space-y-3 bg-blue-50/30">
                  <p className="text-sm font-medium text-gray-700">Laporan Kunjungan</p>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { val: 'order', label: 'Ada Order', color: 'green' },
                      { val: 'tidak_order', label: 'Tidak Order', color: 'gray' },
                      { val: 'tunda', label: 'Tunda', color: 'amber' },
                    ].map(opt => (
                      <button
                        key={opt.val}
                        onClick={() => setHasil(opt.val as typeof hasil)}
                        className={`py-2 rounded-lg text-xs font-medium border transition-colors ${
                          hasil === opt.val
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  <textarea
                    value={catatan}
                    onChange={e => setCatatan(e.target.value)}
                    placeholder="Catatan kunjungan..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />

                  <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 text-xs px-3 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
                      <Camera className="w-3.5 h-3.5" /> Foto
                    </button>
                    <button
                      onClick={handleSelesai}
                      disabled={!hasil}
                      className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-40 text-white text-sm font-medium py-2 rounded-lg transition-colors"
                    >
                      Selesaikan Kunjungan
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {myVisits.length === 0 && (
        <div className="py-16 text-center text-gray-400 text-sm">
          <MapPin className="w-10 h-10 mx-auto mb-2 text-gray-300" />
          Belum ada kunjungan hari ini
        </div>
      )}
    </div>
  )
}
