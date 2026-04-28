import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Image as ImageIcon, Megaphone, Trophy, Wallet, ArrowRight, TrendingUp, TrendingDown } from 'lucide-react'
import { requireAdmin } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import { formatRupiah } from '@/lib/format'

export const metadata = { title: 'Dashboard Admin' }

export default async function AdminDashboardPage() {
  const profile = await requireAdmin()
  const supabase = await createClient()

  // Parallel fetch counts
  const [kegiatanCount, fotoCount, infoCount, arisanCount, transaksiData] = await Promise.all([
    supabase.from('kegiatan').select('*', { count: 'exact', head: true }),
    supabase.from('galeri_foto').select('*', { count: 'exact', head: true }),
    supabase.from('informasi_bulanan').select('*', { count: 'exact', head: true }),
    supabase.from('peserta_arisan').select('*', { count: 'exact', head: true }),
    supabase.from('transaksi_keuangan').select('jenis, nominal'),
  ])

  const totalKegiatan = kegiatanCount.count || 0
  const totalFoto = fotoCount.count || 0
  const totalInformasi = infoCount.count || 0
  const totalArisan = arisanCount.count || 0

  const transaksi = transaksiData.data || []
  const totalPemasukan = transaksi.filter(t => t.jenis === 'pemasukan').reduce((acc, t) => acc + t.nominal, 0)
  const totalPengeluaran = transaksi.filter(t => t.jenis === 'pengeluaran').reduce((acc, t) => acc + t.nominal, 0)
  const saldoTotal = totalPemasukan - totalPengeluaran

  const quickStats = [
    { label: 'Total Kegiatan', value: totalKegiatan, icon: Calendar, color: 'from-red-500 to-orange-500', href: '/admin/kegiatan' },
    { label: 'Total Foto', value: totalFoto, icon: ImageIcon, color: 'from-orange-500 to-amber-500', href: '/admin/galeri' },
    { label: 'Pengumuman', value: totalInformasi, icon: Megaphone, color: 'from-amber-500 to-yellow-500', href: '/admin/informasi' },
    { label: 'Pemenang Arisan', value: totalArisan, icon: Trophy, color: 'from-yellow-500 to-orange-400', href: '/admin/arisan' },
  ]

  const quickActions = [
    { label: 'Tambah Kegiatan', icon: Calendar, href: '/admin/kegiatan/baru' },
    { label: 'Upload Foto Galeri', icon: ImageIcon, href: '/admin/galeri/baru' },
    { label: 'Tulis Pengumuman', icon: Megaphone, href: '/admin/informasi/baru' },
    { label: 'Catat Pemenang Arisan', icon: Trophy, href: '/admin/arisan/baru' },
    { label: 'Tambah Transaksi', icon: Wallet, href: '/admin/keuangan/baru' },
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-extrabold text-stone-900">
          Halo, <span className="text-gradient-sunset">{profile.nama_lengkap.split(' ')[0]}</span>! 👋
        </h1>
        <p className="text-stone-600 mt-1 text-sm md:text-base">
          Selamat datang di panel admin PPDT. Kelola konten website dengan mudah dari sini.
        </p>
      </div>

      <Card className="border-0 bg-gradient-to-br from-red-600 via-orange-500 to-amber-500 text-white shadow-2xl shadow-orange-500/30 overflow-hidden">
        <CardContent className="p-6 md:p-8 relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-300 rounded-full blur-3xl opacity-20" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider text-orange-100">Saldo Kas Terkini</span>
            </div>
            <p className="text-3xl md:text-5xl font-display font-extrabold leading-none mb-4">{formatRupiah(saldoTotal)}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1">
                <TrendingUp className="h-3.5 w-3.5" />
                <span className="font-medium">Masuk: {formatRupiah(totalPemasukan)}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1">
                <TrendingDown className="h-3.5 w-3.5" />
                <span className="font-medium">Keluar: {formatRupiah(totalPengeluaran)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.label} href={stat.href}>
              <Card className="group hover:shadow-xl hover:shadow-orange-500/20 transition-all hover:-translate-y-1 border-0 bg-white cursor-pointer">
                <CardContent className="p-5">
                  <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 shadow-lg shadow-orange-500/30 group-hover:scale-110 transition`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-3xl font-display font-extrabold text-stone-900 leading-none mb-1">{stat.value}</p>
                  <p className="text-xs text-stone-500 font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl font-display font-bold text-stone-900">⚡ Aksi Cepat</h2>
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-0">Tambah konten baru</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link key={action.label} href={action.href}>
                <Card className="group hover:shadow-lg hover:shadow-orange-500/10 transition-all hover:-translate-y-0.5 border-0 bg-white cursor-pointer">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-to-br group-hover:from-red-500 group-hover:to-orange-500 transition">
                      <Icon className="h-4 w-4 text-orange-600 group-hover:text-white transition" />
                    </div>
                    <span className="text-sm font-semibold text-stone-900 flex-1">{action.label}</span>
                    <ArrowRight className="h-4 w-4 text-stone-400 group-hover:text-orange-600 group-hover:translate-x-1 transition" />
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      <Card className="border-0 bg-gradient-to-br from-orange-50 to-amber-50 overflow-hidden">
        <CardContent className="p-6 relative">
          <div className="text-3xl mb-2">💡</div>
          <h3 className="font-display font-bold text-base text-stone-900 mb-2">Tips Menggunakan Panel Admin</h3>
          <ul className="text-sm text-stone-700 space-y-1.5 list-disc list-inside">
            <li>Pastikan foto yang diupload tidak terlalu besar (maksimal 5MB)</li>
            <li>Update informasi bulanan setiap awal bulan untuk konsistensi</li>
            <li>Backup data laporan keuangan secara berkala</li>
            <li>Pengumuman akan langsung tampil di website setelah dipublish</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}