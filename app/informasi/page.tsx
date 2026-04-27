import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Megaphone, Sparkles } from 'lucide-react'
import { dummyInformasi } from '@/lib/dummy-data'
import { formatTanggal, formatPeriode } from '@/lib/format'

export default function InformasiPage() {
  const informasi = [...dummyInformasi]
    .filter((i) => i.status === 'published')
    .sort((a, b) => {
      if (a.tahun !== b.tahun) return b.tahun - a.tahun
      return b.bulan - a.bulan
    })

  return (
    <>
      {/* HERO */}
      <section className="relative bg-mesh-sunset py-16 md:py-20 -mt-16 md:-mt-20 pt-28 md:pt-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-10 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md border border-orange-200 rounded-full px-4 py-1.5 mb-6 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-orange-600" />
              <span className="text-xs font-semibold text-stone-700">Informasi Bulanan</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold mb-4 leading-tight">
              <span className="text-gradient-sunset">Pengumuman</span>
              <br />
              <span className="text-stone-900">& Update Terkini</span>
            </h1>
            <p className="text-base md:text-lg text-stone-600 leading-relaxed">
              Informasi rutin dari pengurus PPDT untuk seluruh anggota dan masyarakat.
            </p>
          </div>
        </div>
      </section>

      {/* LIST INFORMASI */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto space-y-5">
          {informasi.length === 0 ? (
            <Card className="border-0 bg-white">
              <CardContent className="p-12 text-center">
                <Megaphone className="h-16 w-16 mx-auto text-stone-300 mb-4" />
                <p className="text-stone-500">Belum ada informasi yang dipublikasikan.</p>
              </CardContent>
            </Card>
          ) : (
            informasi.map((info, idx) => (
              <Card
                key={info.id}
                className="group border-0 bg-white hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 overflow-hidden"
              >
                <CardContent className="p-6 md:p-8 relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-500 via-orange-500 to-amber-500" />

                  <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                    {/* Icon */}
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/30 group-hover:scale-110 group-hover:rotate-3 transition">
                      <Megaphone className="h-6 w-6 md:h-7 md:w-7 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-0 font-semibold">
                          {formatPeriode(info.bulan, info.tahun)}
                        </Badge>
                        {idx === 0 && (
                          <Badge className="bg-red-500 text-white hover:bg-red-500 border-0 font-semibold animate-pulse">
                            ✨ Terbaru
                          </Badge>
                        )}
                      </div>

                      <h2 className="font-display font-bold text-xl md:text-2xl text-stone-900 mb-3 group-hover:text-orange-600 transition">
                        {info.judul}
                      </h2>

                      <div className="text-stone-600 leading-relaxed whitespace-pre-line text-sm md:text-base">
                        {info.isi}
                      </div>

                      {info.published_at && (
                        <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-4 pt-4 border-t border-stone-100">
                          <Calendar className="h-3.5 w-3.5 text-orange-500" />
                          Dipublikasikan {formatTanggal(info.published_at)}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </section>
    </>
  )
}