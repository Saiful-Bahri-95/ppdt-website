import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, ArrowRight, Trophy, Wallet, Users, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { createClient } from '@/lib/supabase/server'
import { formatTanggal, formatRupiah, truncate } from '@/lib/format'
import type { Kegiatan, PesertaArisan, TransaksiKeuangan } from '@/lib/types/database'

export default async function HomePage() {
  const supabase = await createClient()

  // Fetch data parallel
  const [kegiatanRes, arisanRes, keuanganRes] = await Promise.all([
    supabase.from('kegiatan').select('*').eq('status', 'published').order('tanggal_kegiatan', { ascending: false }).limit(3),
    supabase.from('peserta_arisan').select('*').order('tanggal_keluar', { ascending: false }).limit(1),
    supabase.from('transaksi_keuangan').select('*'),
  ])

  const kegiatanTerbaru = (kegiatanRes.data || []) as Kegiatan[]
  const pemenangTerbaru = (arisanRes.data?.[0] || null) as PesertaArisan | null
  const allKeuangan = (keuanganRes.data || []) as TransaksiKeuangan[]

  // Total kegiatan (semua published)
  const { count: totalKegiatan } = await supabase
    .from('kegiatan')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published')

  const saldoTotal = allKeuangan.reduce((acc, t) => {
    return t.jenis === 'pemasukan' ? acc + t.nominal : acc - t.nominal
  }, 0)

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-mesh-sunset py-20 md:py-32 -mt-16 md:-mt-20 pt-32 md:pt-40">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" style={{ animationDelay: '2s' }} />
          <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" style={{ animationDelay: '4s' }} />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md border border-orange-200 rounded-full px-4 py-1.5 mb-8 animate-fade-in shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-orange-600" />
              <span className="text-xs font-semibold text-stone-700">Selamat Datang di Website Resmi</span>
            </div>

            <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-8 animate-float">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 rounded-full blur-2xl opacity-40" />
              <Image src="/logo-ppdt.png" alt="Logo PPDT" fill sizes="160px" className="object-contain relative drop-shadow-2xl" priority />
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6 leading-[1.05] tracking-tight">
              <span className="text-gradient-sunset">Persatuan Pemuda</span>
              <br />
              <span className="text-stone-900">Dukuh Tengah</span>
            </h1>

            <p className="text-base md:text-xl text-stone-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Wadah pemersatu pemuda dalam membangun lingkungan yang guyub, kreatif, dan berdaya melalui kegiatan sosial, budaya, dan kepemudaan.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/tentang">
                <Button size="lg" className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/40 transition-all hover:-translate-y-0.5 rounded-full px-8 h-12 w-full sm:w-auto">
                  Tentang Kami
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/kegiatan">
                <Button size="lg" variant="outline" className="border-2 border-orange-300 bg-white/50 backdrop-blur-sm text-orange-700 hover:bg-orange-50 rounded-full px-8 h-12 w-full sm:w-auto">
                  Lihat Kegiatan
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 md:h-20 fill-white" preserveAspectRatio="none" viewBox="0 0 1440 100">
            <path d="M0,50 C240,100 480,0 720,50 C960,100 1200,0 1440,50 L1440,100 L0,100 Z" />
          </svg>
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="container mx-auto px-4 -mt-8 md:-mt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          <Card className="group hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-300 hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-6 relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition" />
              <div className="flex items-center gap-4 relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-500/30 group-hover:scale-110 transition">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-stone-500 mb-0.5 font-medium">Pemenang Arisan Terbaru</p>
                  <p className="font-display font-bold text-base truncate text-stone-900">
                    {pemenangTerbaru ? pemenangTerbaru.nama : 'Belum ada'}
                  </p>
                  <p className="text-xs text-stone-500">
                    {pemenangTerbaru ? formatTanggal(pemenangTerbaru.tanggal_keluar) : '-'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-6 relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition" />
              <div className="flex items-center gap-4 relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/30 group-hover:scale-110 transition">
                  <Wallet className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-stone-500 mb-0.5 font-medium">Saldo Kas Terkini</p>
                  <p className="font-display font-bold text-base truncate text-stone-900">{formatRupiah(saldoTotal)}</p>
                  <p className="text-xs text-stone-500">Per {new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-6 relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition" />
              <div className="flex items-center gap-4 relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/30 group-hover:scale-110 transition">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-stone-500 mb-0.5 font-medium">Total Kegiatan</p>
                  <p className="font-display font-bold text-base text-stone-900">{totalKegiatan || 0} Kegiatan</p>
                  <p className="text-xs text-stone-500">Sudah dilaksanakan</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* KEGIATAN TERBARU */}
      {kegiatanTerbaru.length > 0 && (
        <section className="container mx-auto px-4 py-20 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
            <div>
              <Badge className="mb-3 bg-orange-100 text-orange-700 hover:bg-orange-100 border-0 px-3 py-1 text-xs font-semibold">
                ✨ Kegiatan Terbaru
              </Badge>
              <h2 className="text-4xl md:text-5xl font-display font-extrabold text-stone-900 leading-tight">
                Kegiatan <span className="text-gradient-sunset">Kami</span>
              </h2>
              <p className="text-stone-600 mt-3 text-lg">Berbagai kegiatan terkini PPDT untuk masyarakat</p>
            </div>
            <Link href="/kegiatan">
              <Button variant="outline" className="border-2 border-orange-300 text-orange-700 hover:bg-orange-50 rounded-full">
                Lihat Semua
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kegiatanTerbaru.map((kegiatan, idx) => (
              <Link key={kegiatan.id} href={`/kegiatan/${kegiatan.slug}`} className="group">
                <Card className="overflow-hidden h-full hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 group-hover:-translate-y-2 border-0 bg-white pt-0">
                  <div className="relative aspect-video w-full overflow-hidden bg-stone-100">
                    {kegiatan.foto_header_url && (
                      <Image
                        src={kegiatan.foto_header_url}
                        alt={kegiatan.judul}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-white/90 backdrop-blur-sm text-orange-700 border-0 font-semibold">
                        #{idx + 1}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-display font-bold text-xl mb-2 line-clamp-2 group-hover:text-orange-600 transition">
                      {kegiatan.judul}
                    </h3>
                    <p className="text-sm text-stone-600 mb-4 line-clamp-2 leading-relaxed">
                      {kegiatan.ringkasan || truncate(kegiatan.deskripsi, 120)}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-stone-500 pt-3 border-t border-stone-100">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-orange-500" />
                        {formatTanggal(kegiatan.tanggal_kegiatan)}
                      </span>
                      {kegiatan.lokasi && (
                        <span className="flex items-center gap-1.5 truncate">
                          <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-orange-500" />
                          <span className="truncate">{kegiatan.lokasi}</span>
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA SECTION */}
      <section className="container mx-auto px-4 pb-24 pt-12">
        <div className="relative bg-gradient-to-br from-red-600 via-red-500 to-orange-500 rounded-[2.5rem] p-10 md:p-16 text-white text-center overflow-hidden shadow-2xl shadow-orange-500/30">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-orange-300 rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <Sparkles className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
            <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-4 leading-tight">
              Mari Bergabung dan Berkontribusi
            </h2>
            <p className="text-orange-50 max-w-2xl mx-auto mb-8 leading-relaxed text-base md:text-lg">
              Setiap pemuda Dukuh Tengah memiliki peran penting dalam membangun lingkungan yang lebih baik.
            </p>
            <Link href="/tentang">
              <Button size="lg" className="bg-white text-red-600 hover:bg-orange-50 rounded-full px-8 h-12 font-semibold shadow-xl hover:scale-105 transition">
                Pelajari Lebih Lanjut
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}