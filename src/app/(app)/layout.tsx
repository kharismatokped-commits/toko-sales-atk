'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/context/auth-context'
import {
  LayoutDashboard, ShoppingCart, Package, Users, TruckIcon,
  BarChart3, LogOut, ShoppingBag, Menu, X, MapPin, Calendar, MonitorSmartphone,
  CreditCard, Barcode
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const tokoNav = [
  { href: '/toko/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/toko/transaksi', label: 'Transaksi & POS', icon: ShoppingCart },
  { href: '/toko/piutang', label: 'Buku Piutang', icon: CreditCard },
  { href: '/toko/stok', label: 'Stok Produk', icon: Package },
  { href: '/toko/barcode', label: 'Cetak Barcode', icon: Barcode },
  { href: '/toko/pelanggan', label: 'Pelanggan', icon: Users },
  { href: '/toko/pembelian', label: 'Pembelian', icon: TruckIcon },
  { href: '/toko/laporan', label: 'Laporan', icon: BarChart3 },
]

const salesNav = [
  { href: '/sales/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/sales/jadwal', label: 'Jadwal Hari Ini', icon: Calendar },
  { href: '/sales/kunjungan', label: 'Kunjungan', icon: MapPin },
  { href: '/sales/prospek', label: 'Prospek', icon: Users },
]

const supervisorNav = [
  { href: '/sales/monitor', label: 'Monitor Sales', icon: MonitorSmartphone },
  { href: '/sales/jadwal', label: 'Kelola Jadwal', icon: Calendar },
  { href: '/sales/prospek', label: 'Prospek', icon: Users },
  { href: '/toko/laporan', label: 'Laporan', icon: BarChart3 },
]

const ownerNav = [
  { href: '/toko/dashboard', label: 'Dashboard Toko', icon: LayoutDashboard },
  { href: '/toko/transaksi', label: 'Transaksi & POS', icon: ShoppingCart },
  { href: '/toko/piutang', label: 'Buku Piutang', icon: CreditCard },
  { href: '/toko/stok', label: 'Stok Produk ATK', icon: Package },
  { href: '/toko/barcode', label: 'Cetak Barcode', icon: Barcode },
  { href: '/toko/pelanggan', label: 'Pelanggan', icon: Users },
  { href: '/toko/pembelian', label: 'Pembelian Grosir', icon: TruckIcon },
  { href: '/toko/laporan', label: 'Laporan Omzet', icon: BarChart3 },
  { href: '/sales/monitor', label: 'Monitoring Sales', icon: MonitorSmartphone },
  { href: '/sales/jadwal', label: 'Jadwal Kunjungan', icon: Calendar },
  { href: '/sales/prospek', label: 'Data Prospek', icon: Users },
]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, setRole, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) router.replace('/login')
  }, [user, isLoading, router])

  if (isLoading || !user) return null

  const isSalesPath = pathname.startsWith('/sales')
  const isTokoPath = pathname.startsWith('/toko')
  
  if (user.role === 'sales' && isTokoPath) {
    router.replace('/sales/dashboard')
    return null
  }
  
  if (user.role === 'kasir' && isSalesPath) {
    router.replace('/toko/dashboard')
    return null
  }
  
  if (user.role === 'supervisor' && isTokoPath && !pathname.startsWith('/toko/laporan')) {
    router.replace('/sales/monitor')
    return null
  }

  const navItems = user.role === 'owner' ? ownerNav
    : user.role === 'sales' ? salesNav
    : user.role === 'supervisor' ? supervisorNav
    : tokoNav

  const roleLabel: Record<string, string> = {
    owner: 'Owner (Akses Penuh)', kasir: 'Kasir Toko', sales: 'Sales Lapangan', supervisor: 'Supervisor Sales'
  }

  const handleLogout = () => {
    logout()
    router.replace('/login')
  }

  const renderNavContent = () => (
    <>
      <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-100">
        <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <ShoppingBag className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-bold text-gray-900 text-sm tracking-tight">KHALIFA NIAGA</p>
          <p className="text-[11px] text-blue-600 font-medium">{roleLabel[user.role]}</p>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map(item => {
          const active = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                active
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <item.icon className={cn('w-4 h-4', active ? 'text-blue-600' : 'text-gray-400')} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-3 border-t border-gray-100">
        {/* Quick Review Role Switcher */}
        <div className="mb-2 p-2 bg-blue-50/70 rounded-lg border border-blue-100">
          <label className="block text-[10px] font-bold text-blue-900 uppercase tracking-wider mb-1">
            Ganti Mode Review Klien:
          </label>
          <select
            value={user.role}
            onChange={(e) => {
              const newR = e.target.value as any
              setRole(newR)
              if (newR === 'sales') router.push('/sales/dashboard')
              else if (newR === 'supervisor') router.push('/sales/monitor')
              else router.push('/toko/dashboard')
            }}
            className="w-full text-xs font-semibold bg-white border border-blue-200 text-blue-950 rounded px-2 py-1 focus:outline-none"
          >
            <option value="owner">🛡️ Mode: Owner (Semua Modul)</option>
            <option value="kasir">🏪 Mode: Kasir Toko & POS</option>
            <option value="sales">🛵 Mode: Sales Lapangan</option>
            <option value="supervisor">👤 Mode: Supervisor</option>
          </select>
        </div>

        <div className="px-3 py-1 mb-1">
          <p className="text-sm font-medium text-gray-800">{user.name}</p>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-xs text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors font-medium"
        >
          <LogOut className="w-4 h-4" />
          Keluar / Ganti Akun
        </button>
      </div>
    </>
  )

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-white border-r border-gray-200 flex-shrink-0">
        {renderNavContent()}
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white flex flex-col shadow-xl">
            <div className="flex justify-end p-3">
              <button onClick={() => setSidebarOpen(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            {renderNavContent()}
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile topbar */}
        <header className="md:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-gray-900 text-sm tracking-tight">KHALIFA NIAGA</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
