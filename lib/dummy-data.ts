import type {
  Kegiatan,
  GaleriFoto,
  InformasiBulanan,
  PesertaArisan,
  TransaksiKeuangan,
  PengaturanOrganisasi,
} from './types/database'

// Pengaturan Organisasi
export const dummyPengaturan: PengaturanOrganisasi = {
  id: 1,
  nama_organisasi: 'Persatuan Pemuda Dukuh Tengah',
  singkatan: 'PPDT',
  deskripsi: 'PPDT adalah organisasi kepemudaan yang berdiri di Dukuh Tengah, bertujuan menjadi wadah pemersatu dan pengembangan potensi pemuda dalam membangun lingkungan yang guyub, kreatif, dan berdaya. Organisasi ini menaungi berbagai kegiatan sosial, kebudayaan, olahraga, dan keuangan komunitas seperti arisan rutin.',
  alamat: 'Dk Tengah - Tamansari - Jatinegara, Kab. Tegal',
  email: 'offical.ppdt@gmail.com',
  telepon: '+62 838-9707-3151',
  instagram: '@ppdt.dukuhtengah',
  facebook: 'PPDT Dukuh Tengah',
  whatsapp: '+6281234567890',
  updated_at: new Date().toISOString(),
}

// Kegiatan
export const dummyKegiatan: Kegiatan[] = [
  {
    id: '1',
    judul: 'Bakti Sosial Idul Adha 1447 H',
    slug: 'bakti-sosial-idul-adha-1447h',
    deskripsi: 'Kegiatan pembagian daging kurban kepada warga kurang mampu di sekitar Dukuh Tengah. Acara berlangsung khidmat dengan partisipasi seluruh anggota PPDT dan didukung penuh oleh masyarakat. Total 50 paket daging kurban berhasil dibagikan kepada keluarga yang berhak menerima.',
    ringkasan: 'Pembagian 50 paket daging kurban kepada warga kurang mampu sekitar Dukuh Tengah.',
    tanggal_kegiatan: '2026-06-07',
    lokasi: 'Balai Desa Dukuh Tengah',
    foto_header_url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200&h=675&fit=crop',
    status: 'published',
    created_by: null,
    created_at: '2026-06-07T08:00:00Z',
    updated_at: '2026-06-07T08:00:00Z',
  },
  {
    id: '2',
    judul: 'Turnamen Bulu Tangkis PPDT Cup 2026',
    slug: 'turnamen-bulu-tangkis-ppdt-cup-2026',
    deskripsi: 'PPDT Cup 2026 adalah turnamen bulu tangkis tahunan yang diselenggarakan untuk mempererat tali silaturahmi antar pemuda Dukuh Tengah dan sekitarnya. Diikuti oleh 32 peserta yang dibagi dalam kategori tunggal putra dan ganda putra. Acara berlangsung selama 2 hari dengan hadiah jutaan rupiah.',
    ringkasan: 'Turnamen tahunan dengan 32 peserta dalam kategori tunggal dan ganda putra.',
    tanggal_kegiatan: '2026-03-15',
    lokasi: 'GOR Dukuh Tengah',
    foto_header_url: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1200&h=675&fit=crop',
    status: 'published',
    created_by: null,
    created_at: '2026-03-15T09:00:00Z',
    updated_at: '2026-03-15T09:00:00Z',
  },
  {
    id: '3',
    judul: 'Kerja Bakti Lingkungan',
    slug: 'kerja-bakti-lingkungan',
    deskripsi: 'Kegiatan kerja bakti rutin bulanan untuk membersihkan lingkungan Dukuh Tengah. Anggota PPDT bersama warga membersihkan saluran air, memotong rumput liar di area umum, dan mengecat ulang pos kamling. Kegiatan ini menjadi simbol kepedulian pemuda terhadap lingkungan tempat tinggal.',
    ringkasan: 'Kerja bakti rutin bulanan: bersih saluran air, potong rumput, dan cat pos kamling.',
    tanggal_kegiatan: '2026-02-08',
    lokasi: 'Lingkungan RT/RW Dukuh Tengah',
    foto_header_url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=675&fit=crop',
    status: 'published',
    created_by: null,
    created_at: '2026-02-08T07:00:00Z',
    updated_at: '2026-02-08T07:00:00Z',
  },
  {
    id: '4',
    judul: 'Peringatan HUT RI ke-80',
    slug: 'peringatan-hut-ri-ke-80',
    deskripsi: 'Perayaan kemerdekaan Republik Indonesia yang ke-80 dimeriahkan dengan berbagai lomba tradisional seperti panjat pinang, tarik tambang, balap karung, dan lomba makan kerupuk. Acara dihadiri oleh ratusan warga dan ditutup dengan pentas seni serta pembagian hadiah.',
    ringkasan: 'Perayaan HUT RI ke-80 dengan lomba tradisional dan pentas seni.',
    tanggal_kegiatan: '2025-08-17',
    lokasi: 'Lapangan Dukuh Tengah',
    foto_header_url: 'https://images.unsplash.com/photo-1567825395567-bc7e7b08c5d3?w=1200&h=675&fit=crop',
    status: 'published',
    created_by: null,
    created_at: '2025-08-17T07:00:00Z',
    updated_at: '2025-08-17T07:00:00Z',
  },
  {
    id: '5',
    judul: 'Pelatihan Keterampilan Digital',
    slug: 'pelatihan-keterampilan-digital',
    deskripsi: 'Workshop pelatihan keterampilan digital untuk pemuda Dukuh Tengah meliputi dasar desain grafis dengan Canva, manajemen media sosial, dan pengenalan AI tools. Pelatihan ini bertujuan membekali pemuda dengan skill yang relevan di era digital.',
    ringkasan: 'Workshop desain grafis Canva, manajemen sosmed, dan AI tools untuk pemuda.',
    tanggal_kegiatan: '2026-01-25',
    lokasi: 'Aula Balai Desa',
    foto_header_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=675&fit=crop',
    status: 'published',
    created_by: null,
    created_at: '2026-01-25T13:00:00Z',
    updated_at: '2026-01-25T13:00:00Z',
  },
  {
    id: '6',
    judul: 'Buka Bersama Ramadhan 1447 H',
    slug: 'buka-bersama-ramadhan-1447h',
    deskripsi: 'Acara buka bersama yang diikuti oleh seluruh anggota PPDT dan undangan pengurus desa. Selain mempererat silaturahmi, acara ini juga menjadi momen evaluasi program dan diskusi rencana kegiatan ke depan.',
    ringkasan: 'Buka puasa bersama anggota PPDT dan pengurus desa, sekaligus evaluasi program.',
    tanggal_kegiatan: '2026-03-22',
    lokasi: 'Rumah Ketua PPDT',
    foto_header_url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1200&h=675&fit=crop',
    status: 'published',
    created_by: null,
    created_at: '2026-03-22T17:30:00Z',
    updated_at: '2026-03-22T17:30:00Z',
  },
]

// Galeri Foto
export const dummyGaleri: GaleriFoto[] = [
  { id: 'g1', kegiatan_id: '1', foto_url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800', thumbnail_url: null, caption: 'Pembagian daging kurban', urutan: 1, created_at: '2026-06-07T08:00:00Z' },
  { id: 'g2', kegiatan_id: '1', foto_url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800', thumbnail_url: null, caption: 'Antrean penerima', urutan: 2, created_at: '2026-06-07T08:00:00Z' },
  { id: 'g3', kegiatan_id: '2', foto_url: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800', thumbnail_url: null, caption: 'Final tunggal putra', urutan: 1, created_at: '2026-03-15T09:00:00Z' },
  { id: 'g4', kegiatan_id: '2', foto_url: 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=800', thumbnail_url: null, caption: 'Penyerahan hadiah', urutan: 2, created_at: '2026-03-15T09:00:00Z' },
  { id: 'g5', kegiatan_id: '3', foto_url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800', thumbnail_url: null, caption: 'Kerja bakti rutin', urutan: 1, created_at: '2026-02-08T07:00:00Z' },
  { id: 'g6', kegiatan_id: '4', foto_url: 'https://images.unsplash.com/photo-1567825395567-bc7e7b08c5d3?w=800', thumbnail_url: null, caption: 'Lomba panjat pinang', urutan: 1, created_at: '2025-08-17T07:00:00Z' },
  { id: 'g7', kegiatan_id: '4', foto_url: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800', thumbnail_url: null, caption: 'Tarik tambang', urutan: 2, created_at: '2025-08-17T07:00:00Z' },
  { id: 'g8', kegiatan_id: '5', foto_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800', thumbnail_url: null, caption: 'Workshop digital', urutan: 1, created_at: '2026-01-25T13:00:00Z' },
  { id: 'g9', kegiatan_id: '6', foto_url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800', thumbnail_url: null, caption: 'Buka bersama', urutan: 1, created_at: '2026-03-22T17:30:00Z' },
]

// Informasi Bulanan
export const dummyInformasi: InformasiBulanan[] = [
  {
    id: 'i1',
    judul: 'Pengumuman Iuran Bulan April 2026',
    isi: 'Diberitahukan kepada seluruh anggota PPDT bahwa iuran rutin bulan April 2026 sudah dapat dibayarkan kepada Bendahara mulai tanggal 1-15 April 2026. Besaran iuran tetap Rp 50.000 per anggota. Pembayaran dapat dilakukan tunai langsung kepada Bendahara atau transfer ke rekening BRI a.n. PPDT.\n\nMohon kerjasamanya untuk membayar tepat waktu agar program kegiatan dapat berjalan lancar. Terima kasih.',
    bulan: 4,
    tahun: 2026,
    status: 'published',
    published_at: '2026-04-01T08:00:00Z',
    created_by: null,
    created_at: '2026-04-01T08:00:00Z',
    updated_at: '2026-04-01T08:00:00Z',
  },
  {
    id: 'i2',
    judul: 'Rapat Evaluasi Program Triwulan I',
    isi: 'Akan diadakan rapat evaluasi program triwulan pertama tahun 2026 pada:\n\nHari: Sabtu, 12 April 2026\nWaktu: 19.30 WIB\nTempat: Balai Pertemuan Dukuh Tengah\n\nAgenda:\n1. Evaluasi program Januari-Maret 2026\n2. Laporan keuangan triwulan I\n3. Rencana program triwulan II\n4. Diskusi terbuka\n\nKehadiran seluruh anggota sangat diharapkan.',
    bulan: 4,
    tahun: 2026,
    status: 'published',
    published_at: '2026-04-05T10:00:00Z',
    created_by: null,
    created_at: '2026-04-05T10:00:00Z',
    updated_at: '2026-04-05T10:00:00Z',
  },
  {
    id: 'i3',
    judul: 'Pengumuman Pemenang Arisan Maret 2026',
    isi: 'Selamat kepada Sdr. Budi Santoso yang telah keluar dalam undian arisan periode Maret 2026 dengan nominal Rp 5.000.000.\n\nPenyerahan dana arisan dapat dilakukan paling lambat tanggal 31 Maret 2026 setelah konfirmasi dari Bendahara. Tetap semangat menabung untuk anggota lainnya!',
    bulan: 3,
    tahun: 2026,
    status: 'published',
    published_at: '2026-03-25T20:00:00Z',
    created_by: null,
    created_at: '2026-03-25T20:00:00Z',
    updated_at: '2026-03-25T20:00:00Z',
  },
  {
    id: 'i4',
    judul: 'Persiapan Bulan Ramadhan 1447 H',
    isi: 'Menyambut bulan suci Ramadhan 1447 H, PPDT akan menyelenggarakan beberapa kegiatan:\n\n1. Buka bersama setiap minggu di kediaman anggota secara bergiliran\n2. Tadarus Al-Quran berjamaah ba\'da Tarawih\n3. Santunan anak yatim sebelum Idul Fitri\n4. Halal bi halal setelah Idul Fitri\n\nDetail jadwal akan diumumkan menyusul. Mari kita maksimalkan ibadah di bulan yang penuh berkah ini.',
    bulan: 2,
    tahun: 2026,
    status: 'published',
    published_at: '2026-02-20T15:00:00Z',
    created_by: null,
    created_at: '2026-02-20T15:00:00Z',
    updated_at: '2026-02-20T15:00:00Z',
  },
]

// Peserta Arisan
export const dummyArisan: PesertaArisan[] = [
  { id: 'a1', nama: 'Budi Santoso', nomor_urut: 1, tanggal_keluar: '2026-03-25', periode_arisan: 'Periode 2025-2027', nominal: 5000000, keterangan: null, created_at: '2026-03-25T20:00:00Z' },
  { id: 'a2', nama: 'Siti Aminah', nomor_urut: 2, tanggal_keluar: '2026-02-25', periode_arisan: 'Periode 2025-2027', nominal: 5000000, keterangan: null, created_at: '2026-02-25T20:00:00Z' },
  { id: 'a3', nama: 'Ahmad Hidayat', nomor_urut: 3, tanggal_keluar: '2026-01-25', periode_arisan: 'Periode 2025-2027', nominal: 5000000, keterangan: null, created_at: '2026-01-25T20:00:00Z' },
  { id: 'a4', nama: 'Dewi Lestari', nomor_urut: 4, tanggal_keluar: '2025-12-20', periode_arisan: 'Periode 2025-2027', nominal: 5000000, keterangan: null, created_at: '2025-12-20T20:00:00Z' },
  { id: 'a5', nama: 'Eko Prasetyo', nomor_urut: 5, tanggal_keluar: '2025-11-25', periode_arisan: 'Periode 2025-2027', nominal: 5000000, keterangan: null, created_at: '2025-11-25T20:00:00Z' },
  { id: 'a6', nama: 'Fatimah Zahra', nomor_urut: 6, tanggal_keluar: '2025-10-25', periode_arisan: 'Periode 2025-2027', nominal: 5000000, keterangan: null, created_at: '2025-10-25T20:00:00Z' },
  { id: 'a7', nama: 'Gunawan Wibowo', nomor_urut: 7, tanggal_keluar: '2025-09-25', periode_arisan: 'Periode 2025-2027', nominal: 5000000, keterangan: null, created_at: '2025-09-25T20:00:00Z' },
  { id: 'a8', nama: 'Hasan Basri', nomor_urut: 8, tanggal_keluar: '2025-08-25', periode_arisan: 'Periode 2025-2027', nominal: 5000000, keterangan: null, created_at: '2025-08-25T20:00:00Z' },
]

// Transaksi Keuangan
export const dummyKeuangan: TransaksiKeuangan[] = [
  { id: 'k1', tanggal: '2026-04-01', jenis: 'pemasukan', kategori: 'Iuran Anggota', nominal: 1500000, keterangan: 'Iuran 30 anggota April 2026', bukti_url: null, created_by: null, created_at: '2026-04-01T10:00:00Z', updated_at: '2026-04-01T10:00:00Z' },
  { id: 'k2', tanggal: '2026-03-25', jenis: 'pengeluaran', kategori: 'Konsumsi', nominal: 350000, keterangan: 'Konsumsi rapat evaluasi', bukti_url: null, created_by: null, created_at: '2026-03-25T20:00:00Z', updated_at: '2026-03-25T20:00:00Z' },
  { id: 'k3', tanggal: '2026-03-22', jenis: 'pengeluaran', kategori: 'Acara', nominal: 1500000, keterangan: 'Buka bersama Ramadhan', bukti_url: null, created_by: null, created_at: '2026-03-22T20:00:00Z', updated_at: '2026-03-22T20:00:00Z' },
  { id: 'k4', tanggal: '2026-03-15', jenis: 'pengeluaran', kategori: 'Acara', nominal: 2500000, keterangan: 'PPDT Cup 2026', bukti_url: null, created_by: null, created_at: '2026-03-15T20:00:00Z', updated_at: '2026-03-15T20:00:00Z' },
  { id: 'k5', tanggal: '2026-03-10', jenis: 'pemasukan', kategori: 'Donasi', nominal: 1000000, keterangan: 'Donasi untuk PPDT Cup dari sponsor lokal', bukti_url: null, created_by: null, created_at: '2026-03-10T15:00:00Z', updated_at: '2026-03-10T15:00:00Z' },
  { id: 'k6', tanggal: '2026-03-01', jenis: 'pemasukan', kategori: 'Iuran Anggota', nominal: 1500000, keterangan: 'Iuran 30 anggota Maret 2026', bukti_url: null, created_by: null, created_at: '2026-03-01T10:00:00Z', updated_at: '2026-03-01T10:00:00Z' },
  { id: 'k7', tanggal: '2026-02-08', jenis: 'pengeluaran', kategori: 'Operasional', nominal: 250000, keterangan: 'Beli alat kerja bakti', bukti_url: null, created_by: null, created_at: '2026-02-08T10:00:00Z', updated_at: '2026-02-08T10:00:00Z' },
  { id: 'k8', tanggal: '2026-02-01', jenis: 'pemasukan', kategori: 'Iuran Anggota', nominal: 1500000, keterangan: 'Iuran 30 anggota Februari 2026', bukti_url: null, created_by: null, created_at: '2026-02-01T10:00:00Z', updated_at: '2026-02-01T10:00:00Z' },
  { id: 'k9', tanggal: '2026-01-25', jenis: 'pengeluaran', kategori: 'Pelatihan', nominal: 800000, keterangan: 'Pelatihan keterampilan digital', bukti_url: null, created_by: null, created_at: '2026-01-25T18:00:00Z', updated_at: '2026-01-25T18:00:00Z' },
  { id: 'k10', tanggal: '2026-01-01', jenis: 'pemasukan', kategori: 'Iuran Anggota', nominal: 1500000, keterangan: 'Iuran 30 anggota Januari 2026', bukti_url: null, created_by: null, created_at: '2026-01-01T10:00:00Z', updated_at: '2026-01-01T10:00:00Z' },
]

// Helper: hitung saldo total
export function hitungSaldoTotal(transaksi: TransaksiKeuangan[]): number {
  return transaksi.reduce((acc, t) => {
    return t.jenis === 'pemasukan' ? acc + t.nominal : acc - t.nominal
  }, 0)
}

// Helper: rekap per bulan
export interface RekapBulanan {
  tahun: number
  bulan: number
  total_pemasukan: number
  total_pengeluaran: number
  saldo_periode: number
}

export function hitungRekapBulanan(transaksi: TransaksiKeuangan[]): RekapBulanan[] {
  const map = new Map<string, RekapBulanan>()

  for (const t of transaksi) {
    const date = new Date(t.tanggal)
    const tahun = date.getFullYear()
    const bulan = date.getMonth() + 1
    const key = `${tahun}-${bulan}`

    if (!map.has(key)) {
      map.set(key, {
        tahun,
        bulan,
        total_pemasukan: 0,
        total_pengeluaran: 0,
        saldo_periode: 0,
      })
    }

    const rekap = map.get(key)!
    if (t.jenis === 'pemasukan') {
      rekap.total_pemasukan += t.nominal
      rekap.saldo_periode += t.nominal
    } else {
      rekap.total_pengeluaran += t.nominal
      rekap.saldo_periode -= t.nominal
    }
  }

  return Array.from(map.values()).sort((a, b) => {
    if (a.tahun !== b.tahun) return b.tahun - a.tahun
    return b.bulan - a.bulan
  })
}