# Toko App — Sistem Manajemen Toko & Sales Lapangan

Aplikasi web pengganti iPOS 5 Pro untuk toko grosir dengan 2 modul utama.

## Tech Stack
- **Next.js 14** App Router + TypeScript
- **Tailwind CSS** — styling
- **Mock data layer** — siap swap ke Supabase

## Cara Jalankan

```bash
cd toko-app
npm install
npm run dev
```

Buka: http://localhost:3000

## Akun Demo Login

| Role | Email |
|------|-------|
| Owner | owner@toko.com |
| Kasir | kasir@toko.com |
| Sales (Ahmad) | ahmad@toko.com |
| Supervisor | eko@toko.com |

Password bebas (mock auth).

## Struktur Halaman

### Modul Toko (Owner & Kasir)
| Halaman | Path |
|---------|------|
| Dashboard | `/toko/dashboard` |
| Transaksi (list) | `/toko/transaksi` |
| Transaksi Baru (POS) | `/toko/transaksi/baru` |
| Stok Produk | `/toko/stok` |
| Pelanggan | `/toko/pelanggan` |
| Pembelian Grosir | `/toko/pembelian` |
| Laporan | `/toko/laporan` |

### Modul Sales Lapangan
| Halaman | Path |
|---------|------|
| Dashboard Sales | `/sales/dashboard` |
| Jadwal Kunjungan | `/sales/jadwal` |
| Kunjungan + Check-in | `/sales/kunjungan` |
| Prospek | `/sales/prospek` |
| Monitor (Supervisor) | `/sales/monitor` |

## Roadmap

- [x] **Fase 1** — Fondasi + Modul Toko (mock data)
- [ ] **Fase 2** — Koneksi Supabase (swap mock → real DB)
- [ ] **Fase 2b** — Telegram bot notifikasi
- [ ] **Fase 3** — Google Sheets sync, go-live

## Swap ke Supabase

1. Isi `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```
2. Ganti `src/lib/mock/data.ts` → `src/lib/supabase/queries.ts`
3. Ganti `src/lib/context/auth-context.tsx` → pakai `@supabase/ssr`
