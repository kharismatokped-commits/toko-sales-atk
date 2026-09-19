-- ==============================================================================
-- SCHEMA DATABASE APLIKASI TOKO GROSIR & SALES LAPANGAN (SUPABASE POSTGRESQL)
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUM ROLES & STATUS
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('owner', 'kasir', 'sales', 'supervisor');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE transaksi_status AS ENUM ('selesai', 'batal');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE pembelian_status AS ENUM ('draft', 'approved', 'received', 'batal');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE prospek_status AS ENUM ('baru', 'follow_up', 'converted', 'tidak_aktif');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE visit_status AS ENUM ('dijadwalkan', 'checkin', 'selesai', 'tidak_hadir');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. PROFIL USER (Terhubung dengan auth.users Supabase)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role user_role NOT NULL DEFAULT 'kasir',
    wilayah_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABEL WILAYAH
CREATE TABLE IF NOT EXISTS public.wilayah (
    id TEXT PRIMARY KEY,
    nama TEXT NOT NULL,
    sales_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    sales_nama TEXT,
    deskripsi TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TABEL SUPPLIER
CREATE TABLE IF NOT EXISTS public.supplier (
    id TEXT PRIMARY KEY DEFAULT ('sup_' || SUBSTRING(MD5(RANDOM()::TEXT), 1, 8)),
    nama TEXT NOT NULL,
    kontak TEXT,
    alamat TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TABEL PRODUK
CREATE TABLE IF NOT EXISTS public.produk (
    id TEXT PRIMARY KEY DEFAULT ('prod_' || SUBSTRING(MD5(RANDOM()::TEXT), 1, 8)),
    nama TEXT NOT NULL,
    sku TEXT UNIQUE NOT NULL,
    kategori TEXT NOT NULL DEFAULT 'Pulpen, Pensil & Spidol',
    satuan_beli TEXT NOT NULL DEFAULT 'pak',
    satuan_jual TEXT NOT NULL DEFAULT 'pcs',
    konversi INTEGER NOT NULL DEFAULT 12,
    harga_beli NUMERIC NOT NULL DEFAULT 0,
    harga_jual NUMERIC NOT NULL DEFAULT 0,
    stok INTEGER NOT NULL DEFAULT 0,
    stok_minimum INTEGER NOT NULL DEFAULT 10,
    supplier_id TEXT REFERENCES public.supplier(id) ON DELETE SET NULL,
    image TEXT,
    keterangan TEXT,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. TABEL PELANGGAN
CREATE TABLE IF NOT EXISTS public.pelanggan (
    id TEXT PRIMARY KEY DEFAULT ('cust_' || SUBSTRING(MD5(RANDOM()::TEXT), 1, 8)),
    nama TEXT NOT NULL,
    telepon TEXT,
    alamat TEXT,
    tipe TEXT NOT NULL DEFAULT 'eceran', -- 'eceran' atau 'grosir'
    total_pembelian NUMERIC NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. TABEL TRANSAKSI (POS & ORDER SALES)
CREATE TABLE IF NOT EXISTS public.transaksi (
    id TEXT PRIMARY KEY DEFAULT ('trx_' || SUBSTRING(MD5(RANDOM()::TEXT), 1, 8)),
    nomor TEXT UNIQUE NOT NULL,
    tanggal TIMESTAMPTZ DEFAULT NOW(),
    kasir_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    kasir_nama TEXT,
    pelanggan_id TEXT REFERENCES public.pelanggan(id) ON DELETE SET NULL,
    pelanggan_nama TEXT,
    subtotal NUMERIC NOT NULL DEFAULT 0,
    diskon NUMERIC NOT NULL DEFAULT 0,
    total NUMERIC NOT NULL DEFAULT 0,
    bayar NUMERIC NOT NULL DEFAULT 0,
    kembalian NUMERIC NOT NULL DEFAULT 0,
    metode_bayar TEXT NOT NULL DEFAULT 'tunai',
    status transaksi_status NOT NULL DEFAULT 'selesai',
    catatan TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. TABEL TRANSAKSI ITEM
CREATE TABLE IF NOT EXISTS public.transaksi_item (
    id TEXT PRIMARY KEY DEFAULT ('item_' || SUBSTRING(MD5(RANDOM()::TEXT), 1, 8)),
    transaksi_id TEXT NOT NULL REFERENCES public.transaksi(id) ON DELETE CASCADE,
    produk_id TEXT REFERENCES public.produk(id) ON DELETE SET NULL,
    produk_nama TEXT NOT NULL,
    qty INTEGER NOT NULL DEFAULT 1,
    satuan TEXT NOT NULL DEFAULT 'pcs',
    harga NUMERIC NOT NULL DEFAULT 0,
    subtotal NUMERIC NOT NULL DEFAULT 0
);

-- 10. TABEL PEMBELIAN GROSIR (PURCHASE ORDER)
CREATE TABLE IF NOT EXISTS public.pembelian (
    id TEXT PRIMARY KEY DEFAULT ('po_' || SUBSTRING(MD5(RANDOM()::TEXT), 1, 8)),
    nomor TEXT UNIQUE NOT NULL,
    tanggal TIMESTAMPTZ DEFAULT NOW(),
    supplier_id TEXT REFERENCES public.supplier(id) ON DELETE SET NULL,
    supplier_nama TEXT,
    total NUMERIC NOT NULL DEFAULT 0,
    status pembelian_status NOT NULL DEFAULT 'draft',
    catatan TEXT,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. TABEL PEMBELIAN ITEM
CREATE TABLE IF NOT EXISTS public.pembelian_item (
    id TEXT PRIMARY KEY DEFAULT ('pbi_' || SUBSTRING(MD5(RANDOM()::TEXT), 1, 8)),
    pembelian_id TEXT NOT NULL REFERENCES public.pembelian(id) ON DELETE CASCADE,
    produk_id TEXT REFERENCES public.produk(id) ON DELETE SET NULL,
    produk_nama TEXT NOT NULL,
    qty_karton INTEGER NOT NULL DEFAULT 1,
    qty_pcs INTEGER NOT NULL DEFAULT 12,
    harga_beli NUMERIC NOT NULL DEFAULT 0,
    subtotal NUMERIC NOT NULL DEFAULT 0
);

-- 12. TABEL PROSPEK & TOKO LANGGANAN SALES
CREATE TABLE IF NOT EXISTS public.prospek (
    id TEXT PRIMARY KEY DEFAULT ('pr_' || SUBSTRING(MD5(RANDOM()::TEXT), 1, 8)),
    nama TEXT NOT NULL,
    alamat TEXT,
    kontak TEXT,
    wilayah_id TEXT REFERENCES public.wilayah(id) ON DELETE SET NULL,
    status prospek_status NOT NULL DEFAULT 'baru',
    last_visit TIMESTAMPTZ,
    catatan TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. TABEL SALES VISIT & GPS CHECK-IN
CREATE TABLE IF NOT EXISTS public.sales_visit (
    id TEXT PRIMARY KEY DEFAULT ('sv_' || SUBSTRING(MD5(RANDOM()::TEXT), 1, 8)),
    sales_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    sales_nama TEXT,
    prospek_id TEXT REFERENCES public.prospek(id) ON DELETE CASCADE,
    prospek_nama TEXT,
    tanggal DATE NOT NULL DEFAULT CURRENT_DATE,
    jam_checkin TEXT,
    lat NUMERIC,
    lng NUMERIC,
    status visit_status NOT NULL DEFAULT 'dijadwalkan',
    hasil TEXT, -- 'order', 'tidak_order', 'tunda'
    catatan TEXT,
    transaksi_id TEXT REFERENCES public.transaksi(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.produk ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pelanggan ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transaksi ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transaksi_item ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pembelian ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pembelian_item ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prospek ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_visit ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wilayah ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.supplier ENABLE ROW LEVEL SECURITY;

-- Read & Write access for authenticated and public anon (custom role handler)
CREATE POLICY "Public Read Produk" ON public.produk FOR SELECT USING (true);
CREATE POLICY "Public Manage Produk" ON public.produk FOR ALL USING (true);

CREATE POLICY "Public Read Pelanggan" ON public.pelanggan FOR SELECT USING (true);
CREATE POLICY "Public Manage Pelanggan" ON public.pelanggan FOR ALL USING (true);

CREATE POLICY "Public Read Transaksi" ON public.transaksi FOR SELECT USING (true);
CREATE POLICY "Public Manage Transaksi" ON public.transaksi FOR ALL USING (true);

CREATE POLICY "Public Read Transaksi Item" ON public.transaksi_item FOR SELECT USING (true);
CREATE POLICY "Public Manage Transaksi Item" ON public.transaksi_item FOR ALL USING (true);

CREATE POLICY "Public Read Supplier" ON public.supplier FOR SELECT USING (true);
CREATE POLICY "Public Manage Supplier" ON public.supplier FOR ALL USING (true);

CREATE POLICY "Public Read Wilayah" ON public.wilayah FOR SELECT USING (true);
CREATE POLICY "Public Manage Wilayah" ON public.wilayah FOR ALL USING (true);

CREATE POLICY "Public Read Prospek" ON public.prospek FOR SELECT USING (true);
CREATE POLICY "Public Manage Prospek" ON public.prospek FOR ALL USING (true);

CREATE POLICY "Public Read Sales Visit" ON public.sales_visit FOR SELECT USING (true);
CREATE POLICY "Public Manage Sales Visit" ON public.sales_visit FOR ALL USING (true);

CREATE POLICY "Public Read Profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public Manage Profiles" ON public.profiles FOR ALL USING (true);
