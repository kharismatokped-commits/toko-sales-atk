'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/context/auth-context'
import { ShoppingBag, Eye, EyeOff, Store, Navigation, ShieldCheck, UserCheck } from 'lucide-react'
import { Role } from '@/lib/types'

const ROLES: { id: Role; label: string; desc: string; icon: any }[] = [
  { id: 'owner', label: 'Owner', desc: 'Akses Semua Toko & Sales', icon: ShieldCheck },
  { id: 'kasir', label: 'Kasir', desc: 'Modul Toko & Transaksi POS', icon: Store },
  { id: 'sales', label: 'Sales', desc: 'Kunjungan & Order Lapangan', icon: Navigation },
  { id: 'supervisor', label: 'Supervisor', desc: 'Monitor Seluruh Sales', icon: UserCheck },
]

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<Role>('owner')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const ok = await login(email, password, selectedRole)
    setLoading(false)
    if (!ok) {
      setError('Email atau password tidak valid. Silakan periksa kembali.')
      return
    }
    router.replace('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-2xl shadow-lg mb-3">
            <ShoppingBag className="w-7 h-7 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-white">Toko App</h1>
          <p className="text-blue-200 text-xs mt-0.5">Sistem Manajemen Toko & Sales ATK</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <h2 className="text-lg font-bold text-gray-800 mb-1 text-center">Masuk ke Sistem</h2>
          <p className="text-xs text-gray-500 text-center mb-5">Pilih peran/portal kerja Anda di bawah</p>

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-2 mb-5">
            {ROLES.map(r => {
              const Icon = r.icon
              const isSelected = selectedRole === r.id
              return (
                <button
                  type="button"
                  key={r.id}
                  onClick={() => setSelectedRole(r.id)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/80 text-blue-900 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg flex-shrink-0 ${isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold leading-tight">{r.label}</p>
                    <p className="text-[10px] text-gray-400 truncate mt-0.5">{r.desc}</p>
                  </div>
                </button>
              )
            })}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Email Akun</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Masukkan password Anda"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-2.5 rounded-lg transition-colors text-sm"
            >
              {loading ? 'Memverifikasi...' : 'Masuk'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
