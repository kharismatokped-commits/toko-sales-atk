import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/lib/context/auth-context'
import { StoreProvider } from '@/lib/context/store-context'
import { ToastProvider } from '@/lib/context/toast-context'

export const metadata: Metadata = {
  title: 'Toko App — Sistem Manajemen Toko & Sales',
  description: 'Aplikasi manajemen toko grosir dan sales lapangan',
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
