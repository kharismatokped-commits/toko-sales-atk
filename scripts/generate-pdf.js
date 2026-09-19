const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function createManualPDF() {
  const pdfDoc = await PDFDocument.create();
  
  // Font
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Palet Warna
  const primaryBlue = rgb(0.12, 0.35, 0.85); // #1e59d9
  const darkNavy = rgb(0.06, 0.12, 0.28);   // #0f1e47
  const textDark = rgb(0.15, 0.18, 0.25);   // #262e40
  const textMuted = rgb(0.45, 0.50, 0.58);  // #738094
  const bgLight = rgb(0.96, 0.97, 0.99);    // #f5f7fc
  const borderGray = rgb(0.85, 0.88, 0.92); // #d9e0eb
  const accentGreen = rgb(0.08, 0.65, 0.42);// #14a66b
  const accentAmber = rgb(0.88, 0.55, 0.10);// #e08c1a
  const white = rgb(1, 1, 1);

  const A4_WIDTH = 595.28;
  const A4_HEIGHT = 841.89;
  const MARGIN = 40;
  const CONTENT_WIDTH = A4_WIDTH - (MARGIN * 2);

  // Helper untuk draw header halaman
  function drawPageHeader(page, pageNumber, totalPages) {
    // Top Brand Bar
    page.drawRectangle({
      x: 0,
      y: A4_HEIGHT - 6,
      width: A4_WIDTH,
      height: 6,
      color: primaryBlue,
    });

    // KOP Mini
    page.drawText('KHALIFA NIAGA', {
      x: MARGIN,
      y: A4_HEIGHT - 28,
      size: 11,
      font: fontBold,
      color: darkNavy,
    });
    page.drawText('· PANDUAN RESMI HAK AKSES & FITUR 4 PERAN (ROLES)', {
      x: MARGIN + 95,
      y: A4_HEIGHT - 28,
      size: 8.5,
      font: fontRegular,
      color: textMuted,
    });

    // Garis Header
    page.drawLine({
      start: { x: MARGIN, y: A4_HEIGHT - 34 },
      end: { x: A4_WIDTH - MARGIN, y: A4_HEIGHT - 34 },
      thickness: 0.75,
      color: borderGray,
    });

    // Footer
    page.drawLine({
      start: { x: MARGIN, y: 32 },
      end: { x: A4_WIDTH - MARGIN, y: 32 },
      thickness: 0.75,
      color: borderGray,
    });

    page.drawText('Sistem Manajemen Toko & Sales Lapangan ATK · https://khalifa-niaga.vercel.app', {
      x: MARGIN,
      y: 20,
      size: 7.5,
      font: fontRegular,
      color: textMuted,
    });

    page.drawText(`Halaman ${pageNumber} dari ${totalPages}`, {
      x: A4_WIDTH - MARGIN - 65,
      y: 20,
      size: 7.5,
      font: fontRegular,
      color: textMuted,
    });
  }

  // ═══════════════════════════════════════════════════════════
  // HALAMAN 1: COVER & OVERVIEW + PERAN 1 & PERAN 2
  // ═══════════════════════════════════════════════════════════
  const page1 = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);
  let y = A4_HEIGHT - 55;

  // Title Box
  page1.drawRectangle({
    x: MARGIN,
    y: y - 72,
    width: CONTENT_WIDTH,
    height: 72,
    color: bgLight,
    borderColor: primaryBlue,
    borderWidth: 1,
  });

  page1.drawText('DOKUMEN SPESIFIKASI FUNGSI & FITUR 4 PERAN (ROLES)', {
    x: MARGIN + 16,
    y: y - 24,
    size: 13,
    font: fontBold,
    color: primaryBlue,
  });

  page1.drawText('Aplikasi Web Manajemen Toko Grosir ATK & Sales Canvassing — KHALIFA NIAGA', {
    x: MARGIN + 16,
    y: y - 40,
    size: 9,
    font: fontBold,
    color: darkNavy,
  });

  page1.drawText('Edisi: September 2026 · Akses Live Demo: https://khalifa-niaga.vercel.app/ · Versi Sistem: 2.5 (iPOS 5 Pro Core)', {
    x: MARGIN + 16,
    y: y - 56,
    size: 8,
    font: fontRegular,
    color: textMuted,
  });

  y -= 90;

  // Overview Paragraph
  page1.drawText('Aplikasi KHALIFA NIAGA membagi tanggung jawab kerja ke dalam 4 peran akun utama (Role-Based Access Control) guna', {
    x: MARGIN,
    y: y,
    size: 8.5,
    font: fontRegular,
    color: textDark,
  });
  y -= 12;
  page1.drawText('meningkatkan keamanan transaksi, efisiensi rantai pasok ATK, serta akuntabilitas penugasan armada sales lapangan.', {
    x: MARGIN,
    y: y,
    size: 8.5,
    font: fontRegular,
    color: textDark,
  });
  y -= 22;

  // ── SEKSI 1: OWNER (PEMILIK TOKO) ──────────────────────────
  page1.drawRectangle({
    x: MARGIN,
    y: y - 18,
    width: CONTENT_WIDTH,
    height: 20,
    color: primaryBlue,
  });
  page1.drawText('1. PERAN: OWNER (PEMILIK BISNIS & DIREKSI)', {
    x: MARGIN + 10,
    y: y - 13,
    size: 10,
    font: fontBold,
    color: white,
  });
  y -= 28;

  const ownerDetails = [
    { title: 'Tujuan Utama', desc: 'Pengambilan keputusan strategis, kontrol penuh kesehatan arus kas, stok grosir, dan kinerja armada sales.' },
    { title: 'Hak Akses Navigasi', desc: 'Akses penuh ke SEMUA modul Toko (Dashboard, POS, Stok, Pembelian, Laporan) dan SEMUA modul Sales (Monitor, Jadwal, Prospek).' },
    { title: 'Dashboard Finansial', desc: 'Melihat grafik omzet harian/bulanan, laba kotor, total transaksi kasir, dan indikator produk stok menipis.' },
    { title: 'Buku Piutang Toko', desc: 'Memantau akumulasi nota piutang tempo seluruh pelanggan, tanggal jatuh tempo kritis, dan histori cicilan/pelunasan.' },
    { title: 'Pembelian Grosir (PO)', desc: 'Menyetujui (approval) Purchase Order kartonan ke distributor pabrik dengan konversi karton ke pcs otomatis.' },
    { title: 'Monitoring Armada Sales', desc: 'Memantau real-time pencapaian order dan kunjungan lapangan seluruh sales (Ahmad, Rina, Doni, Lina) dalam satu layar.' },
  ];

  for (const item of ownerDetails) {
    page1.drawCircle({ x: MARGIN + 8, y: y - 4, size: 2.5, color: primaryBlue });
    page1.drawText(`${item.title}: `, { x: MARGIN + 16, y: y - 7, size: 8.5, font: fontBold, color: darkNavy });
    const titleWidth = fontBold.widthOfTextAtSize(`${item.title}: `, 8.5);
    page1.drawText(item.desc, { x: MARGIN + 16 + titleWidth, y: y - 7, size: 8.5, font: fontRegular, color: textDark });
    y -= 15;
  }

  y -= 15;

  // ── SEKSI 2: KASIR TOKO (POINT OF SALE & RETAIL) ───────────
  page1.drawRectangle({
    x: MARGIN,
    y: y - 18,
    width: CONTENT_WIDTH,
    height: 20,
    color: accentGreen,
  });
  page1.drawText('2. PERAN: KASIR TOKO (POINT OF SALE & FRONT-OFFICE)', {
    x: MARGIN + 10,
    y: y - 13,
    size: 10,
    font: fontBold,
    color: white,
  });
  y -= 28;

  const kasirDetails = [
    { title: 'Tujuan Utama', desc: 'Melayani operasional transaksi meja kasir, scanning barcode, pelayanan nota tempo, dan cetak struk belanja.' },
    { title: 'Hak Akses Navigasi', desc: 'Modul Toko: Kasir POS, Buku Piutang, Katalog Stok & Cetak Barcode, Pelanggan, Pembelian, dan Laporan Kasir.' },
    { title: 'POS Cepat (Shortcut)', desc: 'Pencarian produk instan, scanner barcode fisik, nominal bayar cepat, dan cetak thermal struk 58mm/80mm.' },
    { title: 'Multi-Tier Grosir Otomatis', desc: 'Harga otomatis turun ke tarif Grosir 1 (qty >= 3) atau Grosir 2 (qty >= 12/karton) saat item ditambahkan kasir.' },
    { title: 'Fitur Hold & Recall Antrian', desc: 'Menahan transaksi berjalan jika pelanggan mengambil barang tambahan, lalu melanjutkan transaksi kapan saja.' },
    { title: 'Penjualan Tempo / Bon Kredit', desc: 'Faktur tempo mencatat tanggal jatuh tempo pelanggan, otomatis terhubung ke Buku Piutang Toko.' },
    { title: 'Studio Cetak Barcode Produk', desc: 'Mencetak stiker label barcode (3 kolom Tom & Jerry) dan price tag rak display KHALIFA NIAGA.' },
  ];

  for (const item of kasirDetails) {
    page1.drawCircle({ x: MARGIN + 8, y: y - 4, size: 2.5, color: accentGreen });
    page1.drawText(`${item.title}: `, { x: MARGIN + 16, y: y - 7, size: 8.5, font: fontBold, color: darkNavy });
    const titleWidth = fontBold.widthOfTextAtSize(`${item.title}: `, 8.5);
    page1.drawText(item.desc, { x: MARGIN + 16 + titleWidth, y: y - 7, size: 8.5, font: fontRegular, color: textDark });
    y -= 15;
  }

  drawPageHeader(page1, 1, 2);

  // ═══════════════════════════════════════════════════════════
  // HALAMAN 2: PERAN 3, PERAN 4 + MATRIKS HAK AKSES
  // ═══════════════════════════════════════════════════════════
  const page2 = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);
  y = A4_HEIGHT - 55;

  // ── SEKSI 3: SALES LAPANGAN (CANVASSING) ───────────────────
  page2.drawRectangle({
    x: MARGIN,
    y: y - 18,
    width: CONTENT_WIDTH,
    height: 20,
    color: primaryBlue,
  });
  page2.drawText('3. PERAN: SALES LAPANGAN (CANVASSING & MOBILE ORDERS)', {
    x: MARGIN + 10,
    y: y - 13,
    size: 10,
    font: fontBold,
    color: white,
  });
  y -= 28;

  const salesDetails = [
    { title: 'Tujuan Utama', desc: 'Mengunjungi toko, sekolah, fotocopy & perkantoran di wilayah tugas untuk meraih pesanan ATK rutin.' },
    { title: 'Hak Akses Navigasi', desc: 'Modul Sales: Dashboard Sales Personal, Jadwal Kunjungan Hari Ini, Check-in GPS Kunjungan, dan Prospek Wilayah.' },
    { title: 'Dashboard Sales Personal', desc: 'Rekap harian: Target kunjungan hari ini, jumlah kunjungan terselesaikan, dan total PO order yang berhasil diraih.' },
    { title: 'Jadwal Rute Hari Ini', desc: 'Daftar nama toko dan rute kunjungan terurut lengkap dengan alamat, kontak pemilik, dan catatan pesanan sebelumnya.' },
    { title: 'Check-in GPS & Laporan', desc: 'Validasi kehadiran di toko pelanggan dengan koordinat GPS, input status (Ada Order/Tidak Order), dan catatan PO.' },
    { title: 'Database Prospek & Tambah Toko', desc: 'Melihat histori toko langganan dan mendaftarkan toko ATK baru langsung di lapangan via ponsel pintar.' },
  ];

  for (const item of salesDetails) {
    page2.drawCircle({ x: MARGIN + 8, y: y - 4, size: 2.5, color: primaryBlue });
    page2.drawText(`${item.title}: `, { x: MARGIN + 16, y: y - 7, size: 8.5, font: fontBold, color: darkNavy });
    const titleWidth = fontBold.widthOfTextAtSize(`${item.title}: `, 8.5);
    page2.drawText(item.desc, { x: MARGIN + 16 + titleWidth, y: y - 7, size: 8.5, font: fontRegular, color: textDark });
    y -= 15;
  }

  y -= 15;

  // ── SEKSI 4: SUPERVISOR SALES (PENGAWASAN) ─────────────────
  page2.drawRectangle({
    x: MARGIN,
    y: y - 18,
    width: CONTENT_WIDTH,
    height: 20,
    color: accentAmber,
  });
  page2.drawText('4. PERAN: SUPERVISOR SALES (PENGAWASAN ARMADA LAPANGAN)', {
    x: MARGIN + 10,
    y: y - 13,
    size: 10,
    font: fontBold,
    color: white,
  });
  y -= 28;

  const spvDetails = [
    { title: 'Tujuan Utama', desc: 'Memastikan target kunjungan armada sales tercapai, pembagian rute merata, dan rasio order optimal.' },
    { title: 'Hak Akses Navigasi', desc: 'Modul Supervisor: Live Monitor Sales, Kelola Jadwal Seluruh Sales, Manajemen Prospek Semua Wilayah, & Laporan.' },
    { title: 'Live Monitoring 4 Sales', desc: 'Memantau progres kunjungan real-time per personel (Ahmad - Pusat/Utara, Rina - Selatan, Doni - Timur, Lina - Barat).' },
    { title: 'Monitoring Check-in & Order', desc: 'Melihat status toko mana yang sedang dikunjungi, jam check-in, dan nilai order yang diperoleh hari ini.' },
    { title: 'Pengaturan Jadwal Tim', desc: 'Menugaskan toko prospek dan menyusun agenda kunjungan harian untuk masing-masing sales binaannya.' },
  ];

  for (const item of spvDetails) {
    page2.drawCircle({ x: MARGIN + 8, y: y - 4, size: 2.5, color: accentAmber });
    page2.drawText(`${item.title}: `, { x: MARGIN + 16, y: y - 7, size: 8.5, font: fontBold, color: darkNavy });
    const titleWidth = fontBold.widthOfTextAtSize(`${item.title}: `, 8.5);
    page2.drawText(item.desc, { x: MARGIN + 16 + titleWidth, y: y - 7, size: 8.5, font: fontRegular, color: textDark });
    y -= 15;
  }

  y -= 20;

  // ── TABEL MATRIKS HAK AKSES ────────────────────────────────
  page2.drawText('TABEL MATRIKS HAK AKSES PERAN SISTEM KHALIFA NIAGA', {
    x: MARGIN,
    y: y,
    size: 9.5,
    font: fontBold,
    color: darkNavy,
  });
  y -= 12;

  // Table Header
  const tableTop = y;
  const colX = [MARGIN, MARGIN + 180, MARGIN + 260, MARGIN + 340, MARGIN + 425, A4_WIDTH - MARGIN];
  
  page2.drawRectangle({
    x: MARGIN,
    y: tableTop - 18,
    width: CONTENT_WIDTH,
    height: 18,
    color: darkNavy,
  });

  page2.drawText('Modul & Fitur Aplikasi', { x: colX[0] + 6, y: tableTop - 13, size: 8, font: fontBold, color: white });
  page2.drawText('Owner', { x: colX[1] + 16, y: tableTop - 13, size: 8, font: fontBold, color: white });
  page2.drawText('Kasir', { x: colX[2] + 16, y: tableTop - 13, size: 8, font: fontBold, color: white });
  page2.drawText('Sales', { x: colX[3] + 16, y: tableTop - 13, size: 8, font: fontBold, color: white });
  page2.drawText('Supervisor', { x: colX[4] + 16, y: tableTop - 13, size: 8, font: fontBold, color: white });

  y = tableTop - 18;

  const matrixRows = [
    { feature: 'Dashboard Omzet & Finansial Toko', owner: 'Penuh', kasir: 'Terbatas', sales: '-', spv: '-' },
    { feature: 'Kasir POS & Transaksi Retail/Grosir', owner: 'Penuh', kasir: 'Penuh', sales: '-', spv: '-' },
    { feature: 'Multi-Tier Harga Grosir & Hold/Recall', owner: 'Penuh', kasir: 'Penuh', sales: '-', spv: '-' },
    { feature: 'Buku Piutang & Pelunasan Cicilan Bon', owner: 'Penuh', kasir: 'Penuh', sales: '-', spv: '-' },
    { feature: 'Cetak Barcode & Price Tag Display', owner: 'Penuh', kasir: 'Penuh', sales: '-', spv: '-' },
    { feature: 'Katalog Produk & Master Stok ATK', owner: 'CRUD', kasir: 'Lihat', sales: '-', spv: '-' },
    { feature: 'Pembelian Grosir (PO Distributor)', owner: 'Approve', kasir: 'Draft', sales: '-', spv: '-' },
    { feature: 'Dashboard Sales & Target Kunjungan', owner: 'Lihat', kasir: '-', sales: 'Penuh', spv: 'Lihat' },
    { feature: 'Check-in GPS & Laporan Order Lapangan', owner: 'Lihat', kasir: '-', sales: 'Penuh', spv: 'Lihat' },
    { feature: 'Live Monitoring 4 Armada Sales', owner: 'Penuh', kasir: '-', sales: '-', spv: 'Penuh' },
    { feature: 'Kelola Jadwal Kunjungan Semua Sales', owner: 'Penuh', kasir: '-', sales: 'Pribadi', spv: 'Penuh' },
  ];

  matrixRows.forEach((row, idx) => {
    const rowBg = idx % 2 === 0 ? white : bgLight;
    page2.drawRectangle({
      x: MARGIN,
      y: y - 14,
      width: CONTENT_WIDTH,
      height: 14,
      color: rowBg,
      borderColor: borderGray,
      borderWidth: 0.5,
    });

    page2.drawText(row.feature, { x: colX[0] + 6, y: y - 10, size: 7.5, font: fontRegular, color: textDark });
    page2.drawText(row.owner, { x: colX[1] + 16, y: y - 10, size: 7.5, font: fontBold, color: primaryBlue });
    page2.drawText(row.kasir, { x: colX[2] + 16, y: y - 10, size: 7.5, font: fontRegular, color: textDark });
    page2.drawText(row.sales, { x: colX[3] + 16, y: y - 10, size: 7.5, font: fontRegular, color: textDark });
    page2.drawText(row.spv, { x: colX[4] + 16, y: y - 10, size: 7.5, font: fontRegular, color: textDark });

    y -= 14;
  });

  // Tanda Pengesahan
  y -= 18;
  page2.drawText('Dokumen ini disusun sebagai petunjuk teknis operasional resmi klien KHALIFA NIAGA.', {
    x: MARGIN,
    y: y,
    size: 7.5,
    font: fontOblique,
    color: textMuted,
  });

  drawPageHeader(page2, 2, 2);

  // Simpan PDF
  const pdfBytes = await pdfDoc.save();
  
  // 1. Simpan di root project
  const rootFilePath = path.join(__dirname, '..', '..', 'PANDUAN_FUNGSI_DAN_FITUR_4_PERAN_KHALIFA_NIAGA.pdf');
  fs.writeFileSync(rootFilePath, pdfBytes);
  console.log('PDF saved to root:', rootFilePath);

  // 2. Simpan di folder public toko-app agar bisa di-download via web browser
  const publicFilePath = path.join(__dirname, '..', 'public', 'PANDUAN_FUNGSI_DAN_FITUR_4_PERAN_KHALIFA_NIAGA.pdf');
  fs.writeFileSync(publicFilePath, pdfBytes);
  console.log('PDF saved to public:', publicFilePath);
}

createManualPDF().catch(err => {
  console.error('Failed to create PDF:', err);
  process.exit(1);
});
