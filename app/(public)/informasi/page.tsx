import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Megaphone, Sparkles } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { formatTanggal, formatPeriode } from '@/lib/format'
import type { InformasiBulanan } from '@/lib/types/database'

export const metadata = { title: 'Informasi Bulanan' }

export default async function InformasiPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('informasi_bulanan')
    .select('*')
    .eq('status', 'published')
    .order('tahun', { ascending: false })
    .order('bulan', { ascending: false })

  const informasi = (data || []) as InformasiBulanan[]

  return (
    <>
      <section className="relative bg-mesh-sunset py-16 md:py-20 -mt-16 md:-mt-20 pt-28 md:pt-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-10 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-blob" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/70 dark:bg-stone-900/70 backdrop-blur-md border border-orange-200 dark:border-orange-900/50 rounded-full px-4 py-1.5 mb-6 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-orange-600 dark:text-orange-400" />
              <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">Informasi Bulanan</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold mb-4 leading-tight">
              <span className="text-gradient-sunset">Pengumuman</span>
              <br />
              <span className="text-stone-900 dark:text-stone-50">& Update Terkini</span>
            </h1>
            <p className="text-base md:text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
              Informasi rutin dari pengurus PPDT untuk seluruh anggota dan masyarakat.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto space-y-5">
          {informasi.length === 0 ? (
            <Card className="border-0 bg-white dark:bg-stone-900">
              <CardContent className="p-12 text-center">
                <Megaphone className="h-16 w-16 mx-auto text-stone-300 dark:text-stone-600 mb-4" />
                <p className="text-stone-500 dark:text-stone-400">Belum ada informasi yang dipublikasikan.</p>
              </CardContent>
            </Card>
          ) : (
            informasi.map((info, idx) => (
              <Card key={info.id} className="group border-0 bg-white dark:bg-stone-900 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 overflow-hidden">
                <CardContent className="p-6 md:p-8 relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-500 via-orange-500 to-amber-500" />

                  <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/30 group-hover:scale-110 group-hover:rotate-3 transition">
                      <Megaphone className="h-6 w-6 md:h-7 md:w-7 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Badge className="bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-400 hover:bg-orange-100 border-0 font-semibold">
                          {formatPeriode(info.bulan, info.tahun)}
                        </Badge>
                        {idx === 0 && (
                          <Badge className="bg-red-500 text-white hover:bg-red-500 border-0 font-semibold animate-pulse">
                            ✨ Terbaru
                          </Badge>
                        )}
                      </div>

                      <h2 className="font-display font-bold text-xl md:text-2xl text-stone-900 dark:text-stone-50 mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition">
                        {info.judul}
                      </h2>

                      <div className="text-stone-600 dark:text-stone-400 leading-relaxed whitespace-pre-line text-sm md:text-base">
                        {info.isi}
                      </div>

                      {info.published_at && (
                        <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 mt-4 pt-4 border-t border-stone-100 dark:border-stone-800">
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