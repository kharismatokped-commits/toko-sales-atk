'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from '@/lib/types'
import { mockUsers } from '@/lib/mock/data'
import { supabase } from '@/lib/supabase/client'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('toko_user')
    if (stored) {
      try { setUser(JSON.parse(stored)) } catch {}
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
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
          role: (userMeta.role as any) || defaultMatch?.role || 'kasir',
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
    if (!found) return false

    setUser(found)
    localStorage.setItem('toko_user', JSON.stringify(found))
    return true
  }

  const logout = async () => {
    try {
      await supabase.auth.signOut()
    } catch {}
    setUser(null)
    localStorage.removeItem('toko_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
