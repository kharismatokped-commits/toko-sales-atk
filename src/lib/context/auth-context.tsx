'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, Role } from '@/lib/types'
import { mockUsers } from '@/lib/mock/data'
import { supabase } from '@/lib/supabase/client'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, selectedRole?: Role) => Promise<boolean>
  logout: () => void
  setRole: (role: Role) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: 'u-preview',
    name: 'Tamu Review (Client)',
    email: 'client.review@toko.com',
    role: 'owner'
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('toko_user')
    if (stored) {
      try { 
        setUser(JSON.parse(stored)) 
      } catch {}
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, selectedRole?: Role): Promise<boolean> => {
    try {
      // 1. Coba login langsung via Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (!authError && authData.user) {
        // Ambil role dari user_metadata atau fallback berdasarkan email/mock
        const userMeta = authData.user.user_metadata || {}
        const defaultMatch = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase())
        
        const activeUser: User = {
          id: authData.user.id,
          name: userMeta.name || defaultMatch?.name || email.split('@')[0],
          email: authData.user.email || email,
          role: selectedRole || (userMeta.role as any) || defaultMatch?.role || 'kasir',
          wilayah_id: userMeta.wilayah_id || defaultMatch?.wilayah_id
        }

        setUser(activeUser)
        localStorage.setItem('toko_user', JSON.stringify(activeUser))
        return true
      }
    } catch (err) {
      console.warn('Supabase Auth error, checking local profiles:', err)
    }

    // 2. Fallback matching untuk user profil yang terdaftar
    const found = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (!found) {
      // Jika email baru dan ada password, buat session sesuai role terpilih
      if (email.includes('@') && password.length >= 3) {
        const newUser: User = {
          id: 'u-' + Date.now(),
          name: email.split('@')[0],
          email: email,
          role: selectedRole || 'owner'
        }
        setUser(newUser)
        localStorage.setItem('toko_user', JSON.stringify(newUser))
        return true
      }
      return false
    }

    const finalUser = selectedRole ? { ...found, role: selectedRole } : found
    setUser(finalUser)
    localStorage.setItem('toko_user', JSON.stringify(finalUser))
    return true
  }

  const logout = async () => {
    try {
      await supabase.auth.signOut()
    } catch {}
    setUser(null)
    localStorage.removeItem('toko_user')
  }

  const setRole = (newRole: Role) => {
    // Cocokkan ke akun mock riil agar semua relasi data (jadwal, kunjungan, wilayah, transaksi) sinkron
    const matched = mockUsers.find(u => u.role === newRole) || {
      id: newRole === 'sales' ? 'u3' : newRole === 'supervisor' ? 'u7' : newRole === 'kasir' ? 'u2' : 'u1',
      name: newRole === 'sales' ? 'Ahmad Sales' : newRole === 'supervisor' ? 'Supervisor Eko' : newRole === 'kasir' ? 'Siti Kasir' : 'Budi Santoso',
      email: `${newRole}@khalifaniaga.com`,
      role: newRole,
      wilayah_id: newRole === 'sales' ? 'w1' : undefined
    }

    setUser(matched)
    localStorage.setItem('toko_user', JSON.stringify(matched))
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, setRole, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
