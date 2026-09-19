export type Role = 'owner' | 'kasir' | 'sales' | 'supervisor'

export interface User {
  id: string
  name: string
  email: string
  role: Role
  wilayah_id?: string
}

export interface Supplier {
  id: string
  nama: string
  kontak: string
  alamat: string
}

export interface Produk {
  id: string
  nama: string
  sku: string
  kategori: string
  satuan_beli: string   // e.g. "karton"
  satuan_jual: string   // e.g. "pcs"
  konversi: number      // 1 karton = N pcs
  harga_beli: number    // per satuan beli
  harga_jual: number    // per satuan jual (eceran)
  harga_grosir_1?: number // harga grosir tingkat 1 (misal beli >= 3)
  min_qty_grosir_1?: number
  harga_grosir_2?: number // harga grosir tingkat 2 (misal beli >= 12 / 1 karton)
  min_qty_grosir_2?: number
  stok: number          // dalam satuan jual (pcs)
  stok_minimum: number  // alert threshold
  supplier_id: string
  active: boolean
  image?: string
  keterangan?: string
}

export interface Pelanggan {
  id: string
  nama: string
  telepon: string
  alamat: string
  tipe: 'eceran' | 'grosir'
  total_pembelian: number
  total_piutang?: number
  created_at: string
}

export interface TransaksiItem {
  id: string
  produk_id: string
  produk_nama: string
  qty: number
  satuan: string
  harga: number
  harga_tipe?: 'eceran' | 'grosir_1' | 'grosir_2'
  subtotal: number
}

export interface Transaksi {
  id: string
  nomor: string
  tanggal: string
  kasir_id: string
  kasir_nama: string
  pelanggan_id?: string
  pelanggan_nama?: string
  items: TransaksiItem[]
  subtotal: number
  diskon: number
  total: number
  bayar: number
  kembalian: number
  metode_bayar: 'tunai' | 'transfer' | 'qris' | 'kredit'
  jatuh_tempo?: string  // jika metode_bayar === 'kredit' (piutang toko)
  status_pembayaran?: 'lunas' | 'belum_lunas'
  status: 'selesai' | 'batal'
  catatan?: string
}

export interface Piutang {
  id: string
  transaksi_id: string
  nomor_transaksi: string
  pelanggan_id: string
  pelanggan_nama: string
  total_piutang: number
  sisa_piutang: number
  jatuh_tempo: string
  status: 'belum_lunas' | 'lunas'
}

export interface PembelianItem {
  id: string
  produk_id: string
  produk_nama: string
  qty_karton: number
  qty_pcs: number          // qty_karton * konversi
  harga_beli: number       // per karton
  subtotal: number
}

export interface Pembelian {
  id: string
  nomor: string
  tanggal: string
  supplier_id: string
  supplier_nama: string
  items: PembelianItem[]
  total: number
  status: 'draft' | 'approved' | 'received' | 'batal'
  catatan?: string
  created_by: string
}

export interface Wilayah {
  id: string
  nama: string
  sales_id: string
  sales_nama: string
  deskripsi?: string
}

export interface Prospek {
  id: string
  nama: string
  alamat: string
  kontak: string
  wilayah_id: string
  status: 'baru' | 'follow_up' | 'converted' | 'tidak_aktif'
  last_visit?: string
  catatan?: string
}

export interface SalesVisit {
  id: string
  sales_id: string
  sales_nama: string
  prospek_id: string
  prospek_nama: string
  tanggal: string
  jam_checkin?: string
  lat?: number
  lng?: number
  status: 'dijadwalkan' | 'checkin' | 'selesai' | 'tidak_hadir'
  hasil?: 'order' | 'tidak_order' | 'tunda'
  catatan?: string
  transaksi_id?: string
}

export interface StokMutasi {
  id: string
  produk_id: string
  produk_nama: string
  tanggal: string
  tipe: 'masuk' | 'keluar' | 'penyesuaian'
  qty: number
  satuan: string
  referensi: string  // nomor transaksi/pembelian
  saldo: number
}

// Dashboard stats
export interface TokoStats {
  omzet_hari_ini: number
  transaksi_hari_ini: number
  produk_stok_menipis: number
  pelanggan_baru_bulan_ini: number
}

export interface SalesStats {
  total_kunjungan: number
  kunjungan_selesai: number
  order_didapat: number
  target_kunjungan: number
}
