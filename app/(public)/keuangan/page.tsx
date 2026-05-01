import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Wallet, Sparkles, ArrowUpCircle, ArrowDownCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { formatRupiah, formatTanggal, formatPeriode } from '@/lib/format'
import { SaldoTrendChart } from '@/components/charts/saldo-trend-chart'
import { PemasukanPengeluaranChart } from '@/components/charts/pemasukan-pengeluaran-chart'
import { KategoriPengeluaranChart } from '@/components/charts/kategori-pengeluaran-chart'
import type { TransaksiKeuangan } from '@/lib/types/database'

export const metadata = { title: 'Laporan Keuangan' }

interface RekapBulanan {
  tahun: number
  bulan: number
  total_pemasukan: number
  total_pengeluaran: number
  saldo_periode: number
}

function hitungRekapBulanan(transaksi: TransaksiKeuangan[]): RekapBulanan[] {
  const map = new Map<string, RekapBulanan>()
  for (const t of transaksi) {
    const date = new Date(t.tanggal)
    const tahun = date.getFullYear()
    const bulan = date.getMonth() + 1
    const key = `${tahun}-${bulan}`
    if (!map.has(key)) {
      map.set(key, { tahun, bulan, total_pemasukan: 0, total_pengeluaran: 0, saldo_periode: 0 })
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

export default async function KeuanganPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('transaksi_keuangan').select('*').order('tanggal', { ascending: false })
  const transaksi = (data || []) as TransaksiKeuangan[]

  const totalPemasukan = transaksi.filter(t => t.jenis === 'pemasukan').reduce((acc, t) => acc + t.nominal, 0)
  const totalPengeluaran = transaksi.filter(t => t.jenis === 'pengeluaran').reduce((acc, t) => acc + t.nominal, 0)
  const saldoTotal = totalPemasukan - totalPengeluaran
  const rekapBulanan = hitungRekapBulanan(transaksi)
  const transaksiTerbaru = transaksi.slice(0, 10)
  const hasData = transaksi.length > 0

  return (
    <>
      <section className="relative bg-mesh-sunset py-16 md:py-20 -mt-16 md:-mt-20 pt-28 md:pt-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-20 w-72 h-72 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md border border-orange-200 rounded-full px-4 py-1.5 mb-6 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-orange-600" />
              <span className="text-xs font-semibold text-stone-700">Laporan Keuangan</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold mb-4 leading-tight">
              <span className="text-gradient-sunset">Transparansi</span>
              <br />
              <span className="text-stone-900">Keuangan Kami</span>
            </h1>
            <p className="text-base md:text-lg text-stone-600 leading-relaxed">
              Laporan lengkap pemasukan dan pengeluaran organisasi PPDT secara terbuka.
            </p>
          </div>
        </div>
      </section>

      {/* SALDO BESAR */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 bg-gradient-to-br from-red-600 via-orange-500 to-amber-500 text-white shadow-2xl shadow-orange-500/30 overflow-hidden">
            <CardContent className="p-8 md:p-10 relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-300 rounded-full blur-3xl opacity-20" />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-red-400 rounded-full blur-3xl opacity-20" />
              <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet className="h-5 w-5" />
                    <span className="text-sm font-semibold uppercase tracking-wider text-orange-100">Saldo Kas Terkini</span>
                  </div>
                  <p className="text-4xl md:text-6xl font-display font-extrabold leading-none mb-2">{formatRupiah(saldoTotal)}</p>
                  <p className="text-sm text-orange-100">Per {new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</p>
                </div>
                <div className="hidden md:block">
                  <Wallet className="h-32 w-32 text-white/20" strokeWidth={1.5} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* STATS */}
      <section className="container mx-auto px-4 py-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-0 bg-white shadow-lg shadow-green-500/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-stone-500 font-medium uppercase">Total Pemasukan</p>
                  <p className="text-xl md:text-2xl font-display font-extrabold text-green-600">{formatRupiah(totalPemasukan)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 bg-white shadow-lg shadow-red-500/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center shadow-lg shadow-red-500/30">
                  <TrendingDown className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-stone-500 font-medium uppercase">Total Pengeluaran</p>
                  <p className="text-xl md:text-2xl font-display font-extrabold text-red-600">{formatRupiah(totalPengeluaran)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CHARTS - VISUALISASI DATA */}
      {hasData && (
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <Badge className="mb-3 bg-orange-100 text-orange-700 hover:bg-orange-100 border-0 px-3 py-1 text-xs font-semibold">
                📈 Visualisasi Data
              </Badge>
              <h2 className="text-3xl md:text-4xl font-display font-extrabold text-stone-900">
                Analisa <span className="text-gradient-sunset">Visual</span>
              </h2>
              <p className="text-stone-600 mt-2">Pantau perkembangan keuangan dalam grafik interaktif</p>
            </div>

            {/* Trend Saldo */}
            <div className="mb-6">
              <SaldoTrendChart
                transaksi={transaksi}
                description="Perkembangan saldo kas dari bulan ke bulan"
              />
            </div>

            {/* Pemasukan vs Pengeluaran + Kategori */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PemasukanPengeluaranChart
                transaksi={transaksi}
                description="Perbandingan arus kas per bulan"
              />
              <KategoriPengeluaranChart
                transaksi={transaksi}
                description="Distribusi pengeluaran berdasarkan kategori"
              />
            </div>
          </div>
        </section>
      )}

      {rekapBulanan.length > 0 && (
        <section className="container mx-auto px-4 py-12 bg-orange-50/50 -mx-4 md:mx-0 md:rounded-3xl">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-8">
              <Badge className="mb-3 bg-orange-100 text-orange-700 hover:bg-orange-100 border-0 px-3 py-1 text-xs font-semibold">📊 Rekap Bulanan</Badge>
              <h2 className="text-3xl md:text-4xl font-display font-extrabold text-stone-900">
                Rekap <span className="text-gradient-sunset">Per Bulan</span>
              </h2>
            </div>

            <div className="space-y-3">
              {rekapBulanan.map((rekap) => (
                <Card key={`${rekap.tahun}-${rekap.bulan}`} className="border-0 bg-white hover:shadow-xl hover:shadow-orange-500/10 transition-all overflow-hidden">
                  <CardContent className="p-5 md:p-6">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0 shadow-md">
                          <span className="text-white font-bold text-sm">{rekap.bulan}</span>
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-base md:text-lg text-stone-900">
                            {formatPeriode(rekap.bulan, rekap.tahun)}
                          </h3>
                          <p className="text-xs text-stone-500">Saldo periode</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 md:gap-6 text-right ml-auto">
                        <div className="hidden sm:block">
                          <p className="text-xs text-stone-500">Masuk</p>
                          <p className="font-semibold text-green-600 text-sm">{formatRupiah(rekap.total_pemasukan)}</p>
                        </div>
                        <div className="hidden sm:block">
                          <p className="text-xs text-stone-500">Keluar</p>
                          <p className="font-semibold text-red-600 text-sm">{formatRupiah(rekap.total_pengeluaran)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-stone-500">Saldo</p>
                          <p className={`font-display font-extrabold text-base md:text-lg ${rekap.saldo_periode >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {rekap.saldo_periode >= 0 ? '+' : ''}{formatRupiah(rekap.saldo_periode)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {transaksiTerbaru.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <Badge className="mb-3 bg-orange-100 text-orange-700 hover:bg-orange-100 border-0 px-3 py-1 text-xs font-semibold">💸 Transaksi Terbaru</Badge>
              <h2 className="text-3xl md:text-4xl font-display font-extrabold text-stone-900">
                <span className="text-gradient-sunset">{transaksiTerbaru.length} Transaksi</span> Terakhir
              </h2>
            </div>

            <div className="space-y-2">
              {transaksiTerbaru.map((t) => (
                <Card key={t.id} className="border-0 bg-white hover:shadow-md transition-all overflow-hidden">
                  <CardContent className="p-4 md:p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          t.jenis === 'pemasukan' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                        }`}>
                          {t.jenis === 'pemasukan' ? <ArrowUpCircle className="h-5 w-5" /> : <ArrowDownCircle className="h-5 w-5" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-sm text-stone-900 truncate">{t.keterangan || t.kategori}</p>
                          <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                            <span>{formatTanggal(t.tanggal)}</span>
                            <span>•</span>
                            <span>{t.kategori}</span>
                          </div>
                        </div>
                      </div>
                      <p className={`font-display font-bold text-sm md:text-base whitespace-nowrap ${
                        t.jenis === 'pemasukan' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {t.jenis === 'pemasukan' ? '+' : '-'}{formatRupiah(t.nominal)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}