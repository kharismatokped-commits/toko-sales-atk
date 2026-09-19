'use client'

import { useState } from 'react'
import { useStore } from '@/lib/context/store-context'
import { formatRupiah, formatTanggalPendek } from '@/lib/utils'
import { Piutang } from '@/lib/types'
import { 
  CreditCard, Search, Filter, AlertTriangle, CheckCircle2, Clock, 
  ArrowUpRight, DollarSign, Printer, X, ShieldAlert 
} from 'lucide-react'

export default function PiutangPage() {
  const { piutang, setPiutang, pelanggan, setPelanggan } = useStore()

  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<'semua' | 'belum_lunas' | 'lunas' | 'overdue'>('semua')
  
  // State Modal Bayar
  const [selectedPiutang, setSelectedPiutang] = useState<Piutang | null>(null)
  const [bayarNominal, setBayarNominal] = useState<number>(0)
  const [metodeBayar, setMetodeBayar] = useState<'tunai' | 'transfer' | 'qris'>('tunai')
  const [catatanBayar, setCatatanBayar] = useState('')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  // Hitung stats
  const today = new Date().toISOString().split('T')[0]
  
  const totalSisaPiutang = piutang
    .filter(p => p.status === 'belum_lunas')
    .reduce((sum, p) => sum + p.sisa_piutang, 0)

  const piutangJatuhTempo = piutang.filter(
    p => p.status === 'belum_lunas' && p.jatuh_tempo <= today
  )

  const countBelumLunas = piutang.filter(p => p.status === 'belum_lunas').length

  // Filter list
  const filteredPiutang = piutang.filter(item => {
    const matchSearch = item.pelanggan_nama.toLowerCase().includes(search.toLowerCase()) ||
      item.nomor_transaksi.toLowerCase().includes(search.toLowerCase())

    if (!matchSearch) return false

    if (filterStatus === 'belum_lunas') return item.status === 'belum_lunas'
    if (filterStatus === 'lunas') return item.status === 'lunas'
    if (filterStatus === 'overdue') return item.status === 'belum_lunas' && item.jatuh_tempo < today

    return true
  })

  // Handle Buka Modal Bayar
  const handleOpenBayar = (item: Piutang) => {
    setSelectedPiutang(item)
    setBayarNominal(item.sisa_piutang)
    setMetodeBayar('tunai')
    setCatatanBayar('')
  }

  // Handle Simpan Pembayaran Cicilan / Pelunasan
  const handleSimpanBayar = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPiutang) return

    if (bayarNominal <= 0) {
      alert('Nominal pembayaran harus lebih dari Rp 0')
      return
    }

    if (bayarNominal > selectedPiutang.sisa_piutang) {
      alert('Nominal pembayaran tidak boleh melebihi sisa piutang!')
      return
    }

    const sisaBaru = selectedPiutang.sisa_piutang - bayarNominal
    const statusBaru = sisaBaru <= 0 ? 'lunas' : 'belum_lunas'

    // Update Piutang List
    setPiutang(prev => prev.map(p => {
      if (p.id === selectedPiutang.id) {
        return {
          ...p,
          sisa_piutang: sisaBaru,
          status: statusBaru
        }
      }
      return p
    }))

    // Kurangi total piutang di data Pelanggan
    setPelanggan(prev => prev.map(c => {
      if (c.id === selectedPiutang.pelanggan_id) {
        return {
          ...c,
          total_piutang: Math.max(0, (c.total_piutang || 0) - bayarNominal)
        }
      }
      return c
    }))

    showToast(`Berhasil mencatat pembayaran ${formatRupiah(bayarNominal)} untuk ${selectedPiutang.pelanggan_nama}`)
    setSelectedPiutang(null)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-gray-700 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
              iPOS 5 Pro Feature
            </span>
            <span className="text-xs text-gray-500 font-medium">Buku Piutang & Kartu Piutang Pelanggan</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Manajemen Piutang & Penjualan Tempo</h1>
          <p className="text-sm text-gray-500">Pantau jatuh tempo nota tempo, saldo piutang toko, dan pelunasan bertahap/cicilan.</p>
        </div>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-colors"
        >
          <Printer className="w-4 h-4 text-gray-500" />
          Cetak Rekap Piutang
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Piutang Belum Lunas</p>
            <p className="text-2xl font-black text-rose-600 mt-1">{formatRupiah(totalSisaPiutang)}</p>
            <p className="text-xs text-gray-400 mt-1">{countBelumLunas} faktur menunggu pelunasan</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Jatuh Tempo Lewat (Overdue)</p>
            <p className="text-2xl font-black text-amber-600 mt-1">{piutangJatuhTempo.length} Nota</p>
            <p className="text-xs text-amber-600 font-medium mt-1">Perlu penagihan segera</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Riwayat Piutang</p>
            <p className="text-2xl font-black text-blue-600 mt-1">{piutang.length} Transaksi</p>
            <p className="text-xs text-emerald-600 font-medium mt-1">
              {piutang.filter(p => p.status === 'lunas').length} sudah lunas
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama pelanggan / no. nota..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
          <button
            onClick={() => setFilterStatus('semua')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              filterStatus === 'semua'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Semua ({piutang.length})
          </button>
          <button
            onClick={() => setFilterStatus('belum_lunas')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              filterStatus === 'belum_lunas'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Belum Lunas ({countBelumLunas})
          </button>
          <button
            onClick={() => setFilterStatus('overdue')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              filterStatus === 'overdue'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Jatuh Tempo ({piutangJatuhTempo.length})
          </button>
          <button
            onClick={() => setFilterStatus('lunas')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              filterStatus === 'lunas'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Lunas ({piutang.filter(p => p.status === 'lunas').length})
          </button>
        </div>
      </div>

      {/* Tabel Piutang */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/80 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="py-3.5 px-4">No. Transaksi</th>
                <th className="py-3.5 px-4">Nama Pelanggan</th>
                <th className="py-3.5 px-4">Tgl Jatuh Tempo</th>
                <th className="py-3.5 px-4 text-right">Total Bon</th>
                <th className="py-3.5 px-4 text-right">Sisa Piutang</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-center">Aksi Pelunasan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
              {filteredPiutang.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    Tidak ada data piutang yang sesuai filter.
                  </td>
                </tr>
              ) : (
                filteredPiutang.map((item) => {
                  const isOverdue = item.status === 'belum_lunas' && item.jatuh_tempo < today
                  const isNearDue = item.status === 'belum_lunas' && !isOverdue && item.jatuh_tempo <= today

                  return (
                    <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-xs font-bold text-gray-900">
                        {item.nomor_transaksi}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-gray-900">{item.pelanggan_nama}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <Clock className={`w-3.5 h-3.5 ${isOverdue ? 'text-rose-500' : 'text-gray-400'}`} />
                          <span className={`${isOverdue ? 'text-rose-600 font-bold' : 'text-gray-600'}`}>
                            {formatTanggalPendek(item.jatuh_tempo)}
                          </span>
                          {isOverdue && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700 ml-1">
                              LEWAT
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right font-semibold text-gray-600">
                        {formatRupiah(item.total_piutang)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-black">
                        {item.sisa_piutang > 0 ? (
                          <span className="text-rose-600">{formatRupiah(item.sisa_piutang)}</span>
                        ) : (
                          <span className="text-emerald-600">Rp 0</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {item.status === 'lunas' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Lunas
                          </span>
                        ) : isOverdue ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
                            <ShieldAlert className="w-3.5 h-3.5" /> Jatuh Tempo
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                            <Clock className="w-3.5 h-3.5" /> Belum Lunas
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {item.status === 'belum_lunas' ? (
                          <button
                            onClick={() => handleOpenBayar(item)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm hover:shadow transition-all"
                          >
                            <DollarSign className="w-3.5 h-3.5" /> Bayar / Cicil
                          </button>
                        ) : (
                          <span className="text-xs text-gray-400 italic">Selesai</span>
                        )}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Bayar Cicilan / Pelunasan Piutang */}
      {selectedPiutang && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">Pembayaran / Pelunasan Piutang</h3>
                  <p className="text-[11px] text-gray-500 font-mono">{selectedPiutang.nomor_transaksi}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPiutang(null)}
                className="w-8 h-8 rounded-lg hover:bg-gray-200/60 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSimpanBayar} className="p-5 space-y-4">
              <div className="bg-blue-50/60 p-3.5 rounded-xl border border-blue-100 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Nama Pelanggan:</span>
                  <span className="font-bold text-gray-900">{selectedPiutang.pelanggan_nama}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Nilai Faktur:</span>
                  <span className="font-semibold text-gray-700">{formatRupiah(selectedPiutang.total_piutang)}</span>
                </div>
                <div className="flex justify-between border-t border-blue-200/60 pt-1 mt-1">
                  <span className="text-rose-700 font-bold">Sisa Piutang Saat Ini:</span>
                  <span className="font-black text-rose-700 text-sm">{formatRupiah(selectedPiutang.sisa_piutang)}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Nominal Pembayaran (Rp)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">Rp</span>
                  <input
                    type="number"
                    min="1000"
                    max={selectedPiutang.sisa_piutang}
                    value={bayarNominal}
                    onChange={(e) => setBayarNominal(Number(e.target.value))}
                    className="w-full pl-10 pr-3 py-2 text-base font-bold text-gray-900 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setBayarNominal(selectedPiutang.sisa_piutang)}
                    className="text-[11px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg border border-blue-200 transition-colors"
                  >
                    Lunasi Penuh ({formatRupiah(selectedPiutang.sisa_piutang)})
                  </button>
                  {selectedPiutang.sisa_piutang > 100000 && (
                    <button
                      type="button"
                      onClick={() => setBayarNominal(Math.floor(selectedPiutang.sisa_piutang / 2))}
                      className="text-[11px] font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded-lg transition-colors"
                    >
                      Bayar 50%
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Metode Pembayaran</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['tunai', 'transfer', 'qris'] as const).map(metode => (
                    <button
                      key={metode}
                      type="button"
                      onClick={() => setMetodeBayar(metode)}
                      className={`py-2 text-xs font-bold rounded-xl border uppercase transition-all ${
                        metodeBayar === metode
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {metode}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Catatan / No. Bukti Transfer (Opsional)</label>
                <input
                  type="text"
                  placeholder="Contoh: Titip tunai via kasir, ref transfer BCA..."
                  value={catatanBayar}
                  onChange={(e) => setCatatanBayar(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedPiutang(null)}
                  className="flex-1 py-2.5 border border-gray-300 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                >
                  Simpan Pembayaran
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
