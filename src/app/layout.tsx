import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/lib/context/auth-context'
import { StoreProvider } from '@/lib/context/store-context'
import { ToastProvider } from '@/lib/context/toast-context'

export const metadata: Metadata = {
  title: 'KHALIFA NIAGA — Sistem Manajemen Toko & Sales ATK',
  description: 'Aplikasi manajemen toko grosir dan sales lapangan ATK KHALIFA NIAGA',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="antialiased font-sans">
        <AuthProvider>
          <StoreProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
