// Helper untuk format data ke Bahasa Indonesia

const NAMA_BULAN = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
]

/**
 * Format angka ke Rupiah: 1500000 → "Rp 1.500.000"
 */
export function formatRupiah(nominal: number | null | undefined): string {
  if (nominal === null || nominal === undefined) return 'Rp 0'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(nominal)
}

/**
 * Format tanggal: "2026-04-27" → "27 April 2026"
 */
export function formatTanggal(tanggal: string | Date): string {
  const date = typeof tanggal === 'string' ? new Date(tanggal) : tanggal
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/**
 * Format tanggal singkat: "2026-04-27" → "27 Apr 2026"
 */
export function formatTanggalSingkat(tanggal: string | Date): string {
  const date = typeof tanggal === 'string' ? new Date(tanggal) : tanggal
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/**
 * Get nama bulan: 1 → "Januari", 12 → "Desember"
 */
export function getNamaBulan(bulan: number): string {
  return NAMA_BULAN[bulan - 1] || ''
}

/**
 * Format periode: bulan=4, tahun=2026 → "April 2026"
 */
export function formatPeriode(bulan: number, tahun: number): string {
  return `${getNamaBulan(bulan)} ${tahun}`
}

/**
 * Truncate text dengan ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}