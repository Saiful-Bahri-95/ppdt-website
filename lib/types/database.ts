// Types untuk tabel-tabel di database PPDT

export type UserRole = 'super_admin' | 'admin' | 'editor'
export type ContentStatus = 'draft' | 'published'
export type TransactionType = 'pemasukan' | 'pengeluaran'

export interface Profile {
  id: string
  nama_lengkap: string
  jabatan: string | null
  role: UserRole
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Kegiatan {
  id: string
  judul: string
  slug: string
  deskripsi: string
  ringkasan: string | null
  tanggal_kegiatan: string
  lokasi: string | null
  foto_header_url: string | null
  status: ContentStatus
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface GaleriFoto {
  id: string
  kegiatan_id: string | null
  foto_url: string
  thumbnail_url: string | null
  caption: string | null
  urutan: number
  created_at: string
}

export interface InformasiBulanan {
  id: string
  judul: string
  isi: string
  bulan: number
  tahun: number
  status: ContentStatus
  published_at: string | null
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface PesertaArisan {
  id: string
  nama: string
  nomor_urut: number
  tanggal_keluar: string
  periode_arisan: string
  nominal: number | null
  keterangan: string | null
  created_at: string
}

export interface TransaksiKeuangan {
  id: string
  tanggal: string
  jenis: TransactionType
  kategori: string
  nominal: number
  keterangan: string | null
  bukti_url: string | null
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface RekapKeuanganBulanan {
  tahun: number
  bulan: number
  total_pemasukan: number
  total_pengeluaran: number
  saldo_periode: number
}

export interface PengaturanOrganisasi {
  id: number
  nama_organisasi: string
  singkatan: string
  deskripsi: string | null
  alamat: string | null
  email: string | null
  telepon: string | null
  instagram: string | null
  facebook: string | null
  whatsapp: string | null
  updated_at: string
}