import { User, Produk, Piutang, Pelanggan, Transaksi, Pembelian, Supplier, Wilayah, Prospek, SalesVisit } from '@/lib/types'

// ─── USERS ────────────────────────────────────────────────────
export const mockUsers: User[] = [
  { id: 'u1', name: 'Budi Santoso', email: 'owner@toko.com', role: 'owner' },
  { id: 'u2', name: 'Siti Kasir', email: 'kasir@toko.com', role: 'kasir' },
  { id: 'u3', name: 'Ahmad Sales', email: 'ahmad@toko.com', role: 'sales', wilayah_id: 'w1' },
  { id: 'u4', name: 'Rina Sales', email: 'rina@toko.com', role: 'sales', wilayah_id: 'w2' },
  { id: 'u5', name: 'Doni Sales', email: 'doni@toko.com', role: 'sales', wilayah_id: 'w3' },
  { id: 'u6', name: 'Lina Sales', email: 'lina@toko.com', role: 'sales', wilayah_id: 'w4' },
  { id: 'u7', name: 'Supervisor Eko', email: 'eko@toko.com', role: 'supervisor' },
]

// ─── SUPPLIERS ────────────────────────────────────────────────
export const mockSuppliers: Supplier[] = [
  { id: 's1', nama: 'Distributor Snowman & Faster Jaya', kontak: '021-5551234', alamat: 'Sentra Grosir Asemka, Jakarta Barat' },
  { id: 's2', nama: 'CV Mandiri ATK Nusantara', kontak: '021-5559876', alamat: 'Kawasan Pergudangan Cipondoh, Tangerang' },
  { id: 's3', nama: 'PT Faber & Stationery Indonesia', kontak: '021-5554321', alamat: 'Daan Mogot KM 12, Jakarta Barat' },
]

// ─── PRODUK ───────────────────────────────────────────────────
export const mockProduk: Produk[] = [
  {
    "id": "atk-1",
    "nama": "PULPEN FASTER F3",
    "sku": "ATK-001",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 234000,
    "harga_jual": 24500,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/pulpen_faster_f3.png",
    "keterangan": "Diskon Tersedia ‼️ Harga/kotak isi 12pcs 1 ktk 24.500"
  },
  {
    "id": "atk-2",
    "nama": "PULPEN SNOWMAN V1",
    "sku": "ATK-002",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 198000,
    "harga_jual": 20500,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/pulpen_snowman_v1.png",
    "keterangan": "Diskon Tersedia ‼️ Harga/kotak isi 12 pcs 1 ktk 20.500"
  },
  {
    "id": "atk-3",
    "nama": "PULPEN SNOWMAN V2",
    "sku": "ATK-003",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 78000,
    "harga_jual": 8000,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/pulpen_snowman_v2.png",
    "keterangan": "PULPEN SNOWMAN V2"
  },
  {
    "id": "atk-4",
    "nama": "PULPEN SNOWMAN GEL V3",
    "sku": "ATK-004",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 78000,
    "harga_jual": 8000,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/pulpen_snowman_gel_v3.png",
    "keterangan": "PULPEN SNOWMAN GEL V3"
  },
  {
    "id": "atk-5",
    "nama": "PULPEN SNOWMAN V4",
    "sku": "ATK-005",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 78000,
    "harga_jual": 8000,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/pulpen_snowman_v4.png",
    "keterangan": "PULPEN SNOWMAN V4"
  },
  {
    "id": "atk-6",
    "nama": "PULPEN SNOWMAN V5",
    "sku": "ATK-006",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 78000,
    "harga_jual": 8000,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/pulpen_snowman_v5.png",
    "keterangan": "Diskon Tersedia"
  },
  {
    "id": "atk-7",
    "nama": "PULPEN SNOWMAN V6",
    "sku": "ATK-007",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 78000,
    "harga_jual": 8000,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/pulpen_snowman_v6.png",
    "keterangan": "PULPEN SNOWMAN V6"
  },
  {
    "id": "atk-8",
    "nama": "PULPEN SNOWMAN V8",
    "sku": "ATK-008",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 78000,
    "harga_jual": 8000,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/pulpen_snowman_v8.png",
    "keterangan": "PULPEN SNOWMAN V8"
  },
  {
    "id": "atk-9",
    "nama": "PULPEN HI-TECH PREMIUM VA-599",
    "sku": "ATK-009",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 156000,
    "harga_jual": 16000,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/pulpen_hi_tech_premium_va599.png",
    "keterangan": "PROMO ‼️ Rp 16.000 Rp 19.500"
  },
  {
    "id": "atk-10",
    "nama": "PULPEN GEL IPEN 15",
    "sku": "ATK-010",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 96000,
    "harga_jual": 10000,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/pulpen_gel_ipen_15.png",
    "keterangan": "Diskon Tersedia ‼️ Harga/pak isi 12pcs 1 pak 10.000"
  },
  {
    "id": "atk-11",
    "nama": "PULPEN GEL WINSTAR WS-2",
    "sku": "ATK-011",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 96000,
    "harga_jual": 10000,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/pulpen_gel_winstar_ws2.png",
    "keterangan": "1 ktk 10.000 ⬇️ Diskon Tersedia ‼️ 3 ktk 9.200 12ktk..."
  },
  {
    "id": "atk-12",
    "nama": "PULPEN SEMI GEL V-111",
    "sku": "ATK-012",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 84000,
    "harga_jual": 9000,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/pulpen_semi_gel_v111.png",
    "keterangan": "1 ktk 9.000 ⬇️ diskon tersedia ‼️ 3 ktk 8.200 12 ktk..."
  },
  {
    "id": "atk-13",
    "nama": "PULPEN M2000 HITAM",
    "sku": "ATK-013",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 72000,
    "harga_jual": 7500,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/pulpen_m2000_hitam.png",
    "keterangan": "(isi 12 pcs) ⬇️ 1 pak 7.500 3 pak 7.000 12 pak 6.250"
  },
  {
    "id": "atk-14",
    "nama": "PULPEN AOWA 2 SISI",
    "sku": "ATK-014",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 108000,
    "harga_jual": 11000,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/pulpen_aowa_2_sisi.png",
    "keterangan": "1 pak isi 10 pcs 1 pak 11.000 3 pak 10.000 12 pak 9.500"
  },
  {
    "id": "atk-15",
    "nama": "PULPEN GEL ST NATURAL",
    "sku": "ATK-015",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 60000,
    "harga_jual": 6500,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/pulpen_gel_st_natural.png",
    "keterangan": "1 pak isi 5pcs 1 pak 6.500 3 pak 6.000 12 pak 5.500"
  },
  {
    "id": "atk-16",
    "nama": "PULPEN GEL KLIK K35",
    "sku": "ATK-016",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 132000,
    "harga_jual": 14000,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/pulpen_gel_klik_k35.png",
    "keterangan": "1 ktk 14.000 ⬇️ Diskon Tersedia ‼️ 3 ktk 13.000 12kt..."
  },
  {
    "id": "atk-17",
    "nama": "PULPEN GEL TEST 2",
    "sku": "ATK-017",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 78000,
    "harga_jual": 8000,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/pulpen_gel_test_2.png",
    "keterangan": "Diskon Tersedia ‼️ Harga/pak isi 12pcs 1 pak 8.000 3..."
  },
  {
    "id": "atk-18",
    "nama": "PULPEN GEL AIAI",
    "sku": "ATK-018",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 78000,
    "harga_jual": 8000,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/pulpen_gel_aiai.png",
    "keterangan": "Diskon Tersedia ‼️ Harga/pak isi 12pcs Bisa Campur..."
  },
  {
    "id": "atk-19",
    "nama": "PULPEN GEL KELINCI",
    "sku": "ATK-019",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 78000,
    "harga_jual": 8000,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/pulpen_gel_kelinci.png",
    "keterangan": "PULPEN GEL KELINCI (bagian bawah terpotong di screenshot)"
  },
  {
    "id": "atk-20",
    "nama": "PULPEN GEL KARAKTER",
    "sku": "ATK-020",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 60000,
    "harga_jual": 6000,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/pulpen_gel_karakter.png",
    "keterangan": "1 pak isi 6pcs 1 pak 6.000 3 pak 5.500 12 pak 5.000"
  },
  {
    "id": "atk-21",
    "nama": "PULPEN LILIN PRINCE",
    "sku": "ATK-021",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 78000,
    "harga_jual": 8000,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/pulpen_lilin_prince.png",
    "keterangan": "PULPEN LILIN PRINCE"
  },
  {
    "id": "atk-22",
    "nama": "PULPEN ULIR NEVADA",
    "sku": "ATK-022",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 60000,
    "harga_jual": 6000,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/pulpen_ulir_nevada.png",
    "keterangan": "🏷️*LIHAT PROMO* *1 ktk 6000* *3 ktk 5.500* *12 ktk..."
  },
  {
    "id": "atk-23",
    "nama": "PULPEN LILIN KING",
    "sku": "ATK-023",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 72000,
    "harga_jual": 7500,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/pulpen_lilin_king.png",
    "keterangan": "isi 12pcs 1 pak 7.500 3 pak 7.000 12 pak 6.500"
  },
  {
    "id": "atk-24",
    "nama": "PULPEN BISA DIHAPUS",
    "sku": "ATK-024",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 96000,
    "harga_jual": 10000,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/pulpen_bisa_dihapus.png",
    "keterangan": "Harga/Lusin : 12pcs"
  },
  {
    "id": "atk-25",
    "nama": "PENSIL 2B M2000 BIRU",
    "sku": "ATK-025",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 60000,
    "harga_jual": 6000,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/pensil_2b_m2000_biru.png",
    "keterangan": "🏷️*LIHAT PROMO* *1-2 ktk 6.000* *3-11 ktk 5.500* *..."
  },
  {
    "id": "atk-26",
    "nama": "PENSIL 2B M2000 HIJAU",
    "sku": "ATK-026",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 60000,
    "harga_jual": 6000,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/pensil_2b_m2000_hijau.png",
    "keterangan": "🏷️*LIHAT PROMO* *1-2 ktk 6.000* *3-11 ktk 5.500* *..."
  },
  {
    "id": "atk-27",
    "nama": "PENSIL 2B M2000 GARIS",
    "sku": "ATK-027",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 60000,
    "harga_jual": 6000,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/pensil_2b_m2000_garis.png",
    "keterangan": "PENSIL 2B M2000 GARIS"
  },
  {
    "id": "atk-28",
    "nama": "PENSIL 2B M2000 GLOW",
    "sku": "ATK-028",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 60000,
    "harga_jual": 6500,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/pensil_2b_m2000_glow.png",
    "keterangan": "Harga/kotak isi 12pcs 1 ktk 6.500 3 ktk 6.000 12ktk 5...."
  },
  {
    "id": "atk-29",
    "nama": "SPIDOL WB MONTANA",
    "sku": "ATK-029",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 96000,
    "harga_jual": 10000,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/spidol_wb_montana.png",
    "keterangan": "SPIDOL WB MONTANA"
  },
  {
    "id": "atk-30",
    "nama": "SPIDOL PERMANEN MONTANA",
    "sku": "ATK-030",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 96000,
    "harga_jual": 10000,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/spidol_permanen_montana.png",
    "keterangan": "SPIDOL PERMANEN MONTANA"
  },
  {
    "id": "atk-31",
    "nama": "Spidol WB AOWA",
    "sku": "ATK-031",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 96000,
    "harga_jual": 10000,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/spidol_wb_aowa.png",
    "keterangan": "Spidol WB AOWA"
  },
  {
    "id": "atk-32",
    "nama": "TINTA REFILL WB SNOWMAN",
    "sku": "ATK-032",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 144000,
    "harga_jual": 15000,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/tinta_refill_wb_snowman.png",
    "keterangan": "🏷️*LIHAT PROMO* 1 - 2 pcs 15.000 3 - 11 pcs 14.000..."
  },
  {
    "id": "atk-33",
    "nama": "PENSIL WARNA CLEVER (pendek)",
    "sku": "ATK-033",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 60000,
    "harga_jual": 6000,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/pensil_warna_clever_pendek.png",
    "keterangan": "PENSIL WARNA CLEVER (pendek)"
  },
  {
    "id": "atk-34",
    "nama": "PENSIL WARNA SAFARI (pendek)",
    "sku": "ATK-034",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 60000,
    "harga_jual": 6000,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/pensil_warna_safari_pendek.png",
    "keterangan": "PENSIL WARNA SAFARI (pendek)"
  },
  {
    "id": "atk-35",
    "nama": "PENSIL WARNA CLEVER (panjang)",
    "sku": "ATK-035",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 60000,
    "harga_jual": 6000,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/pensil_warna_clever_panjang.png",
    "keterangan": "PENSIL WARNA CLEVER (panjang)"
  },
  {
    "id": "atk-36",
    "nama": "PENSIL WARNA SAFARI (panjang)",
    "sku": "ATK-036",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 60000,
    "harga_jual": 6000,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/pensil_warna_safari_panjang.png",
    "keterangan": "PENSIL WARNA SAFARI (panjang)"
  },
  {
    "id": "atk-37",
    "nama": "Spidol 12 Warna Kecil",
    "sku": "ATK-037",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 96000,
    "harga_jual": 10000,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/spidol_12_warna_kecil.png",
    "keterangan": "12 Warna/pak"
  },
  {
    "id": "atk-38",
    "nama": "CRAYON FLORENCE",
    "sku": "ATK-038",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 78000,
    "harga_jual": 8000,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/crayon_florence.png",
    "keterangan": "🏷️*LIHAT PROMO* *1 set 8.000* *6 set 6.750* *12 se..."
  },
  {
    "id": "atk-39",
    "nama": "STABILO 2 SISI",
    "sku": "ATK-039",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 114000,
    "harga_jual": 12000,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/stabilo_2_sisi.png",
    "keterangan": "STABILO 2 SISI"
  },
  {
    "id": "atk-40",
    "nama": "STABILO MORANDI",
    "sku": "ATK-040",
    "kategori": "Pulpen, Pensil & Spidol",
    "satuan_beli": "pak",
    "satuan_jual": "pcs",
    "konversi": 12,
    "harga_beli": 114000,
    "harga_jual": 12000,
    "stok": 120,
    "stok_minimum": 24,
    "supplier_id": "s1",
    "active": true,
    "image": "/images/stabilo_morandi.png",
    "keterangan": "STABILO MORANDI"
  }
]

// ─── PELANGGAN ────────────────────────────────────────────────
export const mockPelanggan: Pelanggan[] = [
  { id: 'c1', nama: 'Umum / Tunai', telepon: '-', alamat: '-', tipe: 'eceran', total_pembelian: 0, created_at: '2024-01-01' },
  { id: 'c2', nama: 'Toko Pak Hasan', telepon: '0812-1111-2222', alamat: 'Jl. Mawar No. 5', tipe: 'grosir', total_pembelian: 4500000, created_at: '2024-02-15' },
  { id: 'c3', nama: 'Warung Bu Sari', telepon: '0813-3333-4444', alamat: 'Jl. Melati No. 12', tipe: 'eceran', total_pembelian: 850000, created_at: '2024-03-10' },
  { id: 'c4', nama: 'Minimarket Maju', telepon: '0821-5555-6666', alamat: 'Jl. Kenanga No. 7', tipe: 'grosir', total_pembelian: 12000000, created_at: '2024-01-20' },
]

// ─── TRANSAKSI ────────────────────────────────────────────────
export const mockTransaksi: Transaksi[] = [
  {
    id: 't1', nomor: 'TRX-20240919-001', tanggal: '2024-09-19T08:15:00',
    kasir_id: 'u2', kasir_nama: 'Siti Kasir',
    pelanggan_id: 'c2', pelanggan_nama: 'Toko Pak Hasan',
    items: [
      { id: 'ti1', produk_id: 'p1', produk_nama: 'Mie Goreng Indomie', qty: 40, satuan: 'pcs', harga: 2500, subtotal: 100000 },
      { id: 'ti2', produk_id: 'p3', produk_nama: 'Beras Premium 5kg', qty: 10, satuan: 'kg', harga: 13000, subtotal: 130000 },
    ],
    subtotal: 230000, diskon: 0, total: 230000, bayar: 250000, kembalian: 20000,
    metode_bayar: 'tunai', status: 'selesai'
  },
  {
    id: 't2', nomor: 'TRX-20240919-002', tanggal: '2024-09-19T09:30:00',
    kasir_id: 'u2', kasir_nama: 'Siti Kasir',
    items: [
      { id: 'ti3', produk_id: 'p4', produk_nama: 'Minyak Goreng Bimoli 1L', qty: 2, satuan: 'botol', harga: 16000, subtotal: 32000 },
      { id: 'ti4', produk_id: 'p5', produk_nama: 'Sabun Lifebuoy 80gr', qty: 3, satuan: 'pcs', harga: 5000, subtotal: 15000 },
    ],
    subtotal: 47000, diskon: 0, total: 47000, bayar: 50000, kembalian: 3000,
    metode_bayar: 'tunai', status: 'selesai'
  },
]

// ─── PEMBELIAN ────────────────────────────────────────────────
export const mockPembelian: Pembelian[] = [
  {
    id: 'pb1', nomor: 'PO-20240918-001', tanggal: '2024-09-18',
    supplier_id: 's1', supplier_nama: 'PT Indofood Sukses',
    items: [
      { id: 'pbi1', produk_id: 'p1', produk_nama: 'Mie Goreng Indomie', qty_karton: 5, qty_pcs: 200, harga_beli: 85000, subtotal: 425000 },
      { id: 'pbi2', produk_id: 'p2', produk_nama: 'Mie Kuah Indomie', qty_karton: 3, qty_pcs: 120, harga_beli: 85000, subtotal: 255000 },
    ],
    total: 680000, status: 'received', created_by: 'u1'
  },
  {
    id: 'pb2', nomor: 'PO-20240919-001', tanggal: '2024-09-19',
    supplier_id: 's2', supplier_nama: 'CV Sumber Makmur',
    items: [
      { id: 'pbi3', produk_id: 'p3', produk_nama: 'Beras Premium 5kg', qty_karton: 10, qty_pcs: 250, harga_beli: 150000, subtotal: 1500000 },
    ],
    total: 1500000, status: 'draft', created_by: 'u1'
  },
]

// Helper tanggal dinamis agar jadwal & kunjungan sales selalu aktif di hari ini
const now = new Date()
const getISODate = (offsetDays: number = 0) => {
  const d = new Date(now)
  d.setDate(d.getDate() + offsetDays)
  return d.toISOString().split('T')[0]
}
const todayStr = getISODate(0)
const yesterdayStr = getISODate(-1)
const twoDaysAgoStr = getISODate(-2)
const tomorrowStr = getISODate(1)
const inTwoDaysStr = getISODate(2)

// ─── WILAYAH SALES ATK ─────────────────────────────────────────
export const mockWilayah: Wilayah[] = [
  { 
    id: 'w1', 
    nama: 'Wilayah Jakarta Pusat & Utara', 
    sales_id: 'u3', 
    sales_nama: 'Ahmad Sales', 
    deskripsi: 'Sentra Grosir ATK Senen, Salemba, Glodok Plaza, & Kelapa Gading' 
  },
  { 
    id: 'w2', 
    nama: 'Wilayah Jakarta Selatan', 
    sales_id: 'u4', 
    sales_nama: 'Rina Sales', 
    deskripsi: 'Kawasan Perkantoran TB Simatupang, Tebet, Fatmawati, & Blok M' 
  },
  { 
    id: 'w3', 
    nama: 'Wilayah Jakarta Timur', 
    sales_id: 'u5', 
    sales_nama: 'Doni Sales', 
    deskripsi: 'Sentra Kampus Rawamangun, Percetakan Matraman, & Sentra Industri Pulogadung' 
  },
  { 
    id: 'w4', 
    nama: 'Wilayah Jakarta Barat', 
    sales_id: 'u6', 
    sales_nama: 'Lina Sales', 
    deskripsi: 'Kawasan Kampus Grogol, Percetakan Tomang, Sentra Roxy, & Kebon Jeruk' 
  },
]

// ─── DATA PROSPEK TOKO & MITRA ATK ─────────────────────────────
export const mockProspek: Prospek[] = [
  // Wilayah 1 (Ahmad Sales - Pusat & Utara)
  { 
    id: 'pr1', 
    nama: 'Toko Buku & Kitab Al-Falah', 
    alamat: 'Jl. Kramat Raya No. 42, Senen, Jakarta Pusat', 
    kontak: '0812-9871-2341 (H. Ridwan)', 
    wilayah_id: 'w1', 
    status: 'converted', 
    last_visit: todayStr,
    catatan: 'Pelanggan setia. Rutin order pulpen Snowman & buku tulis setiap 2 minggu.'
  },
  { 
    id: 'pr2', 
    nama: 'Percetakan & Fotocopy Salemba Express', 
    alamat: 'Jl. Salemba Tengah No. 14, Kenari, Jakarta Pusat', 
    kontak: '0813-1122-3344 (Pak Gunawan)', 
    wilayah_id: 'w1', 
    status: 'converted', 
    last_visit: todayStr,
    catatan: 'Kebutuhan tinggi kertas continuous form, lakban cokelat, & spidol marker.'
  },
  { 
    id: 'pr3', 
    nama: 'Toko ATK Sinar Abadi Glodok', 
    alamat: 'Komp. Glodok Plaza Blok B No. 12, Mangga Besar', 
    kontak: '0821-4455-6677 (Koh Handoko)', 
    wilayah_id: 'w1', 
    status: 'follow_up', 
    last_visit: todayStr,
    catatan: 'Sedang negosiasi harga Grosir 2 untuk pesanan 50 karton perlengkapan arsip.'
  },
  { 
    id: 'pr4', 
    nama: 'Koperasi Harapan Bangsa School', 
    alamat: 'Jl. Boulevard Artha Gading No. 8, Kelapa Gading', 
    kontak: '0818-7788-9900 (Ibu Diana)', 
    wilayah_id: 'w1', 
    status: 'baru', 
    catatan: 'Prospek pengadaan tender perlengkapan ATK siswa ajaran baru.'
  },
  { 
    id: 'pr5', 
    nama: 'Toko Stationery Jaya Makmur', 
    alamat: 'Pasar Pagi Mangga Dua Lt. 2 Blok C No. 25', 
    kontak: '0857-3322-1100 (Pak Binsar)', 
    wilayah_id: 'w1', 
    status: 'follow_up', 
    last_visit: yesterdayStr,
    catatan: 'Tertarik menjadi agen distribusi pensil 2B & stabilo neon Morandi.'
  },

  // Wilayah 2 (Rina Sales - Selatan)
  { 
    id: 'pr6', 
    nama: 'Toko Kertas & ATK Prima Selatan', 
    alamat: 'Jl. Fatmawati Raya No. 25, Cilandak, Jaksel', 
    kontak: '0812-3344-5566 (Pak Yudi)', 
    wilayah_id: 'w2', 
    status: 'converted', 
    last_visit: todayStr,
    catatan: 'Langganan tetap. Pengambilan tempo jatuh tempo 30 hari selalu lancar.'
  },
  { 
    id: 'pr7', 
    nama: 'Kantor Notaris & PPAT Santoso, SH', 
    alamat: 'Gedung Simatupang Office Tower Lt. 4, Jaksel', 
    kontak: '0821-9988-7766 (Ibu Maya - GA)', 
    wilayah_id: 'w2', 
    status: 'follow_up', 
    last_visit: todayStr,
    catatan: 'Kebutuhan bulanan map sneilhecter, kertas segel, dan materai.'
  },
  { 
    id: 'pr8', 
    nama: 'Toko Buku & ATK Mahasiswa Tebet', 
    alamat: 'Jl. Tebet Barat Dalam Raya No. 18, Tebet', 
    kontak: '0877-2233-4455 (Mas Dodi)', 
    wilayah_id: 'w2', 
    status: 'follow_up', 
    last_visit: todayStr,
    catatan: 'Minta katalog promo pulpen Faster F3 & binder clip Joyko.'
  },
  { 
    id: 'pr9', 
    nama: 'Lembaga Bimbel & Edukasi Bintang Prestasi', 
    alamat: 'Jl. Panglima Polim No. 8, Melawai, Jaksel', 
    kontak: '0813-6655-4433 (Admin Operasional)', 
    wilayah_id: 'w2', 
    status: 'baru', 
    catatan: 'Perlu pasokan spidol whiteboard Snowman refill & penghapus papan.'
  },

  // Wilayah 3 (Doni Sales - Timur)
  { 
    id: 'pr10', 
    nama: 'Toko Alat Tulis & Fotocopy Rawamangun', 
    alamat: 'Jl. Paus No. 18 (Dekat UNJ), Rawamangun', 
    kontak: '0812-7766-5544 (Bang Rizal)', 
    wilayah_id: 'w3', 
    status: 'converted', 
    last_visit: todayStr,
    catatan: 'Volume penjualan tinggi untuk perlengkapan skripsi & alat tulis kuliah.'
  },
  { 
    id: 'pr11', 
    nama: 'Percetakan & ATK Al-Hikmah Jatinegara', 
    alamat: 'Jl. Matraman Raya No. 88, Jatinegara', 
    kontak: '0819-3322-1144 (Pak Haji Syukur)', 
    wilayah_id: 'w3', 
    status: 'converted', 
    last_visit: todayStr,
    catatan: 'Pengambilan grosir kartonan untuk binder note & map business file.'
  },
  { 
    id: 'pr12', 
    nama: 'Toko ATK Barokah Duren Sawit', 
    alamat: 'Jl. Pahlawan Revolusi No. 4, Duren Sawit', 
    kontak: '0856-1122-3344 (Ibu Haryati)', 
    wilayah_id: 'w3', 
    status: 'follow_up', 
    catatan: 'Menunggu konfirmasi owner untuk PO perdana paket atk sekolah.'
  },
  { 
    id: 'pr13', 
    nama: 'Koperasi Karyawan Kawasan Pulogadung', 
    alamat: 'Kawasan Industri Pulogadung Blok C-5, Cakung', 
    kontak: '0812-8899-0011 (Pak Hendro - Ketua)', 
    wilayah_id: 'w3', 
    status: 'baru', 
    catatan: 'Telah dikirimkan proposal penawaran grosir perlengkapan ATK pabrik.'
  },

  // Wilayah 4 (Lina Sales - Barat)
  { 
    id: 'pr14', 
    nama: 'CV Sentra Grafika & Digital Printing', 
    alamat: 'Jl. Kyai Tapa No. 12 (Dekat Univ. Trisakti), Grogol', 
    kontak: '0811-9988-2233 (Pak Kevin)', 
    wilayah_id: 'w4', 
    status: 'converted', 
    last_visit: todayStr,
    catatan: 'Kebutuhan besar lakban cokelat Daimaru, kertas art paper, & cutter Joyko.'
  },
  { 
    id: 'pr15', 
    nama: 'Toko Alat Tulis Kampus Untar & Trisakti', 
    alamat: 'Jl. Tawakal Raya No. 3, Tomang, Jakbar', 
    kontak: '0813-7766-8899 (Ibu Selvi)', 
    wilayah_id: 'w4', 
    status: 'converted', 
    last_visit: todayStr,
    catatan: 'Minat promo Pulpen Gel Ipen 15 dan stabilo pastel Morandi.'
  },
  { 
    id: 'pr16', 
    nama: 'Toko Kertas & Stationery Roxy Mas', 
    alamat: 'ITC Roxy Mas Lt. 3 No. 45, Hasyim Ashari', 
    kontak: '0858-3344-5566 (Koh Rudy)', 
    wilayah_id: 'w4', 
    status: 'follow_up', 
    catatan: 'Menunggu restock pulpen Faster F3 kartonan minggu depan.'
  },
  { 
    id: 'pr17', 
    nama: 'Toko Buku & Perlengkapan Sekolah Palmerah', 
    alamat: 'Jl. Kemanggisan Utama No. 11, Palmerah', 
    kontak: '0812-4433-2211 (Pak Bambang)', 
    wilayah_id: 'w4', 
    status: 'tidak_aktif', 
    catatan: 'Toko sedang renovasi gedung sampai awal bulan depan.'
  },
]

// ─── RIWAYAT & JADWAL KUNJUNGAN SALES (REAL-TIME AKTIF) ────────
export const mockSalesVisit: SalesVisit[] = [
  // ── Hari Ini (Ahmad Sales - u3) ──
  {
    id: 'sv-ahmad-1',
    sales_id: 'u3',
    sales_nama: 'Ahmad Sales',
    prospek_id: 'pr1',
    prospek_nama: 'Toko Buku & Kitab Al-Falah',
    tanggal: todayStr,
    jam_checkin: '08:45',
    lat: -6.1844,
    lng: 106.8456,
    status: 'selesai',
    hasil: 'order',
    catatan: 'PO Langsung Disetujui: 10 pak Faster F3, 5 pak Joyko gel, 3 karton map sneilhecter. Total Rp 1.450.000.'
  },
  {
    id: 'sv-ahmad-2',
    sales_id: 'u3',
    sales_nama: 'Ahmad Sales',
    prospek_id: 'pr2',
    prospek_nama: 'Percetakan & Fotocopy Salemba Express',
    tanggal: todayStr,
    jam_checkin: '10:15',
    lat: -6.1952,
    lng: 106.8512,
    status: 'selesai',
    hasil: 'order',
    catatan: 'Order 8 rim continuous form & 12 pak Snowman Whiteboard marker. Minta kirim besok pagi.'
  },
  {
    id: 'sv-ahmad-3',
    sales_id: 'u3',
    sales_nama: 'Ahmad Sales',
    prospek_id: 'pr3',
    prospek_nama: 'Toko ATK Sinar Abadi Glodok',
    tanggal: todayStr,
    jam_checkin: '11:30',
    lat: -6.1432,
    lng: 106.8155,
    status: 'checkin',
    catatan: 'Sedang cek stock display rak toko dan negosiasi harga tier grosir 2 untuk pembelian karton.'
  },
  {
    id: 'sv-ahmad-4',
    sales_id: 'u3',
    sales_nama: 'Ahmad Sales',
    prospek_id: 'pr4',
    prospek_nama: 'Koperasi Harapan Bangsa School',
    tanggal: todayStr,
    status: 'dijadwalkan',
    catatan: 'Jadwal temu presentasi katalog ATK semester baru dengan pengurus yayasan pukul 14:00 WIB.'
  },
  {
    id: 'sv-ahmad-5',
    sales_id: 'u3',
    sales_nama: 'Ahmad Sales',
    prospek_id: 'pr5',
    prospek_nama: 'Toko Stationery Jaya Makmur',
    tanggal: todayStr,
    status: 'dijadwalkan',
    catatan: 'Follow up penawaran stabilo pastel morandi & cutter kenko pukul 15:45 WIB.'
  },

  // ── Hari Ini (Rina Sales - u4) ──
  {
    id: 'sv-rina-1',
    sales_id: 'u4',
    sales_nama: 'Rina Sales',
    prospek_id: 'pr6',
    prospek_nama: 'Toko Kertas & ATK Prima Selatan',
    tanggal: todayStr,
    jam_checkin: '09:00',
    lat: -6.2954,
    lng: 106.7932,
    status: 'selesai',
    hasil: 'order',
    catatan: 'Repeat order grosir: 15 pak binder clip Joyko & 4 lusin correction tape. Nilai PO Rp 920.000.'
  },
  {
    id: 'sv-rina-2',
    sales_id: 'u4',
    sales_nama: 'Rina Sales',
    prospek_id: 'pr7',
    prospek_nama: 'Kantor Notaris & PPAT Santoso, SH',
    tanggal: todayStr,
    jam_checkin: '10:45',
    lat: -6.2911,
    lng: 106.8122,
    status: 'selesai',
    hasil: 'tidak_order',
    catatan: 'Stok materai dan kertas segel masih mencukupi hingga akhir bulan. Dijadwalkan kunjungan ulang tgl 5 bulan depan.'
  },
  {
    id: 'sv-rina-3',
    sales_id: 'u4',
    sales_nama: 'Rina Sales',
    prospek_id: 'pr8',
    prospek_nama: 'Toko Buku & ATK Mahasiswa Tebet',
    tanggal: todayStr,
    jam_checkin: '11:45',
    lat: -6.2288,
    lng: 106.8533,
    status: 'checkin',
    catatan: 'Sedang memeriksa display pulpen gel dan menghitung sisa stok pensil 2B ujian.'
  },
  {
    id: 'sv-rina-4',
    sales_id: 'u4',
    sales_nama: 'Rina Sales',
    prospek_id: 'pr9',
    prospek_nama: 'Lembaga Bimbel & Edukasi Bintang Prestasi',
    tanggal: todayStr,
    status: 'dijadwalkan',
    catatan: 'Perkenalan brand KHALIFA NIAGA & penawaran paket refill spidol whiteboard.'
  },

  // ── Hari Ini (Doni Sales - u5) ──
  {
    id: 'sv-doni-1',
    sales_id: 'u5',
    sales_nama: 'Doni Sales',
    prospek_id: 'pr10',
    prospek_nama: 'Toko Alat Tulis & Fotocopy Rawamangun',
    tanggal: todayStr,
    jam_checkin: '09:15',
    lat: -6.1923,
    lng: 106.8844,
    status: 'selesai',
    hasil: 'order',
    catatan: 'Order 5 karton pulpen Snowman V6 & V8 untuk persiapan tahun ajaran baru. Total Rp 2.850.000.'
  },
  {
    id: 'sv-doni-2',
    sales_id: 'u5',
    sales_nama: 'Doni Sales',
    prospek_id: 'pr11',
    prospek_nama: 'Percetakan & ATK Al-Hikmah Jatinegara',
    tanggal: todayStr,
    jam_checkin: '11:00',
    lat: -6.2166,
    lng: 106.8677,
    status: 'selesai',
    hasil: 'order',
    catatan: 'PO 2 lusin tinta spidol whiteboard & 10 rim kertas HVS A4 80gr.'
  },
  {
    id: 'sv-doni-3',
    sales_id: 'u5',
    sales_nama: 'Doni Sales',
    prospek_id: 'pr12',
    prospek_nama: 'Toko ATK Barokah Duren Sawit',
    tanggal: todayStr,
    status: 'dijadwalkan',
    catatan: 'Jadwal kunjungan follow up sampel produk ATK pukul 14:30 WIB.'
  },

  // ── Hari Ini (Lina Sales - u6) ──
  {
    id: 'sv-lina-1',
    sales_id: 'u6',
    sales_nama: 'Lina Sales',
    prospek_id: 'pr14',
    prospek_nama: 'CV Sentra Grafika & Digital Printing',
    tanggal: todayStr,
    jam_checkin: '09:30',
    lat: -6.1688,
    lng: 106.7899,
    status: 'selesai',
    hasil: 'order',
    catatan: 'Deal pesanan 20 dus lakban cokelat Daimaru 2 inch & 8 karton lem Joyko.'
  },
  {
    id: 'sv-lina-2',
    sales_id: 'u6',
    sales_nama: 'Lina Sales',
    prospek_id: 'pr15',
    prospek_nama: 'Toko Alat Tulis Kampus Untar & Trisakti',
    tanggal: todayStr,
    jam_checkin: '11:15',
    lat: -6.1711,
    lng: 106.7922,
    status: 'selesai',
    hasil: 'order',
    catatan: 'Order 30 pak pulpen Gel Ipen 15 dan 25 set stabilo morandi.'
  },
  {
    id: 'sv-lina-3',
    sales_id: 'u6',
    sales_nama: 'Lina Sales',
    prospek_id: 'pr16',
    prospek_nama: 'Toko Kertas & Stationery Roxy Mas',
    tanggal: todayStr,
    status: 'dijadwalkan',
    catatan: 'Jadwal temu dengan pemilik toko pukul 15:00 WIB.'
  },

  // ── Riwayat Kemarin (Yesterday) ──
  {
    id: 'sv-prev-1',
    sales_id: 'u3',
    sales_nama: 'Ahmad Sales',
    prospek_id: 'pr2',
    prospek_nama: 'Percetakan & Fotocopy Salemba Express',
    tanggal: yesterdayStr,
    jam_checkin: '09:30',
    lat: -6.1952,
    lng: 106.8512,
    status: 'selesai',
    hasil: 'order',
    catatan: 'Pengambilan sampel kertas kalkir dan map folio.'
  },
  {
    id: 'sv-prev-2',
    sales_id: 'u4',
    sales_nama: 'Rina Sales',
    prospek_id: 'pr6',
    prospek_nama: 'Toko Kertas & ATK Prima Selatan',
    tanggal: yesterdayStr,
    jam_checkin: '13:15',
    lat: -6.2954,
    lng: 106.7932,
    status: 'selesai',
    hasil: 'order',
    catatan: 'Penyelesaian pembayaran tagihan tempo bulan lalu.'
  },
  {
    id: 'sv-prev-3',
    sales_id: 'u5',
    sales_nama: 'Doni Sales',
    prospek_id: 'pr10',
    prospek_nama: 'Toko Alat Tulis & Fotocopy Rawamangun',
    tanggal: yesterdayStr,
    jam_checkin: '10:00',
    lat: -6.1923,
    lng: 106.8844,
    status: 'selesai',
    hasil: 'order',
    catatan: 'Pengiriman katalog fisik ATK semester ganjil.'
  },
  {
    id: 'sv-prev-4',
    sales_id: 'u6',
    sales_nama: 'Lina Sales',
    prospek_id: 'pr14',
    prospek_nama: 'CV Sentra Grafika & Digital Printing',
    tanggal: yesterdayStr,
    jam_checkin: '14:20',
    lat: -6.1688,
    lng: 106.7899,
    status: 'selesai',
    hasil: 'tidak_order',
    catatan: 'Pemilik sedang di luar kota, staf minta kembali besok (hari ini).'
  },

  // ── Jadwal Besok (Tomorrow) ──
  {
    id: 'sv-next-1',
    sales_id: 'u3',
    sales_nama: 'Ahmad Sales',
    prospek_id: 'pr3',
    prospek_nama: 'Toko ATK Sinar Abadi Glodok',
    tanggal: tomorrowStr,
    status: 'dijadwalkan',
    catatan: 'Pengantaran faktur & surat jalan pesanan kartonan.'
  },
  {
    id: 'sv-next-2',
    sales_id: 'u4',
    sales_nama: 'Rina Sales',
    prospek_id: 'pr9',
    prospek_nama: 'Lembaga Bimbel & Edukasi Bintang Prestasi',
    tanggal: tomorrowStr,
    status: 'dijadwalkan',
    catatan: 'Demo ketahanan spidol whiteboard dan sampel penghapus magnet.'
  },
  {
    id: 'sv-next-3',
    sales_id: 'u5',
    sales_nama: 'Doni Sales',
    prospek_id: 'pr13',
    prospek_nama: 'Koperasi Karyawan Kawasan Pulogadung',
    tanggal: tomorrowStr,
    status: 'dijadwalkan',
    catatan: 'Meeting lanjutan penetapan supplier resmi ATK 2026.'
  },
]

export function getProdukById(products: Produk[], id: string) {
  return products.find(p => p.id === id)
}

export function getPelangganById(pelanggan: Pelanggan[], id: string) {
  return pelanggan.find(p => p.id === id)
}

export function getSupplierById(suppliers: Supplier[], id: string) {
  return suppliers.find(s => s.id === id)
}

export function getProdukStokRendah(products: Produk[]) {
  return products.filter(p => p.stok <= p.stok_minimum)
}

export function getOmzetHariIni(transaksi: Transaksi[]) {
  const today = new Date().toISOString().split('T')[0]
  return transaksi
    .filter(t => t.tanggal.startsWith(today) && t.status === 'selesai')
    .reduce((sum, t) => sum + t.total, 0)
}

export function generateId() {
  return Math.random().toString(36).substring(2, 10)
}

export function generateNomorTransaksi(transaksi: Transaksi[]) {
  const today = new Date().toISOString().split('T')[0].replace(/-/g, '')
  const seq = String(transaksi.length + 1).padStart(3, '0')
  return `TRX-${today}-${seq}`
}

export function generateNomorPO(pembelian: Pembelian[]) {
  const today = new Date().toISOString().split('T')[0].replace(/-/g, '')
  const seq = String(pembelian.length + 1).padStart(3, '0')
  return `PO-${today}-${seq}`
}

// ─── PIUTANG (iPOS 5 Fitur Penjualan Tempo) ────────────────────
export const mockPiutang: Piutang[] = [
  {
    id: "piu-1",
    transaksi_id: "t1",
    nomor_transaksi: "TRX-20240915-001",
    pelanggan_id: "c2",
    pelanggan_nama: "Toko Pak Hasan",
    total_piutang: 1250000,
    sisa_piutang: 650000,
    jatuh_tempo: "2024-10-15",
    status: "belum_lunas"
  },
  {
    id: "piu-2",
    transaksi_id: "t3",
    nomor_transaksi: "TRX-20240918-004",
    pelanggan_id: "c4",
    pelanggan_nama: "Minimarket Maju",
    total_piutang: 2400000,
    sisa_piutang: 2400000,
    jatuh_tempo: "2024-10-05",
    status: "belum_lunas"
  }
];
