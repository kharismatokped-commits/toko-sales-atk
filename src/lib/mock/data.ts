import { User, Produk, Pelanggan, Transaksi, Pembelian, Supplier, Wilayah, Prospek, SalesVisit } from '@/lib/types'

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

// ─── WILAYAH ──────────────────────────────────────────────────
export const mockWilayah: Wilayah[] = [
  { id: 'w1', nama: 'Wilayah Utara', sales_id: 'u3', sales_nama: 'Ahmad Sales', deskripsi: 'Kec. Cilincing, Koja, Tanjung Priok' },
  { id: 'w2', nama: 'Wilayah Selatan', sales_id: 'u4', sales_nama: 'Rina Sales', deskripsi: 'Kec. Tebet, Pancoran, Pasar Minggu' },
  { id: 'w3', nama: 'Wilayah Timur', sales_id: 'u5', sales_nama: 'Doni Sales', deskripsi: 'Kec. Cakung, Duren Sawit, Jatinegara' },
  { id: 'w4', nama: 'Wilayah Barat', sales_id: 'u6', sales_nama: 'Lina Sales', deskripsi: 'Kec. Grogol, Tambora, Cengkareng' },
]

// ─── PROSPEK ──────────────────────────────────────────────────
export const mockProspek: Prospek[] = [
  { id: 'pr1', nama: 'Toko Berkah', alamat: 'Jl. Utara No. 3', kontak: '0812-1234-5678', wilayah_id: 'w1', status: 'follow_up', last_visit: '2024-09-17' },
  { id: 'pr2', nama: 'Warung Pak Joko', alamat: 'Jl. Utara No. 11', kontak: '0813-8765-4321', wilayah_id: 'w1', status: 'baru' },
  { id: 'pr3', nama: 'Minimarket Sejati', alamat: 'Jl. Selatan No. 8', kontak: '0821-2345-6789', wilayah_id: 'w2', status: 'converted', last_visit: '2024-09-16' },
  { id: 'pr4', nama: 'Toko Harapan', alamat: 'Jl. Timur No. 5', kontak: '0819-9876-5432', wilayah_id: 'w3', status: 'follow_up', last_visit: '2024-09-15' },
]

// ─── SALES VISIT ──────────────────────────────────────────────
export const mockSalesVisit: SalesVisit[] = [
  {
    id: 'sv1', sales_id: 'u3', sales_nama: 'Ahmad Sales',
    prospek_id: 'pr1', prospek_nama: 'Toko Berkah',
    tanggal: '2024-09-19', jam_checkin: '09:15',
    lat: -6.1, lng: 106.85,
    status: 'selesai', hasil: 'order', catatan: 'Ambil 2 karton mie goreng'
  },
  {
    id: 'sv2', sales_id: 'u3', sales_nama: 'Ahmad Sales',
    prospek_id: 'pr2', prospek_nama: 'Warung Pak Joko',
    tanggal: '2024-09-19',
    status: 'dijadwalkan'
  },
  {
    id: 'sv3', sales_id: 'u4', sales_nama: 'Rina Sales',
    prospek_id: 'pr3', prospek_nama: 'Minimarket Sejati',
    tanggal: '2024-09-19', jam_checkin: '10:30',
    lat: -6.25, lng: 106.82,
    status: 'selesai', hasil: 'tidak_order', catatan: 'Stok masih penuh, kunjungi lagi minggu depan'
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
