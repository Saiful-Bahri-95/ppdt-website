import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trophy, Calendar, Sparkles, Users } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { formatTanggal, formatRupiah } from '@/lib/format'
import type { PesertaArisan } from '@/lib/types/database'

export const metadata = { title: 'Peserta Arisan' }

export default async function ArisanPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('peserta_arisan')
    .select('*')
    .order('tanggal_keluar', { ascending: false })

  const arisan = (data || []) as PesertaArisan[]
  const totalKeluar = arisan.length
  const periode = arisan[0]?.periode_arisan || '-'

  return (
    <>
      <section className="relative bg-mesh-sunset py-16 md:py-20 -mt-16 md:-mt-20 pt-28 md:pt-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md border border-orange-200 rounded-full px-4 py-1.5 mb-6 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-orange-600" />
              <span className="text-xs font-semibold text-stone-700">Peserta Arisan</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold mb-4 leading-tight">
              <span className="text-gradient-sunset">Pemenang</span>
              <br />
              <span className="text-stone-900">Arisan PPDT</span>
            </h1>
            <p className="text-base md:text-lg text-stone-600 leading-relaxed">
              Daftar anggota yang telah keluar dalam undian arisan rutin PPDT.
            </p>
          </div>
        </div>
      </section>

      {arisan.length > 0 && (
        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Card className="border-0 bg-white shadow-lg shadow-orange-500/10">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-orange-500/30">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <p className="text-3xl font-display font-extrabold text-gradient-sunset">{totalKeluar}</p>
                <p className="text-xs text-stone-500 mt-1 font-medium">Sudah Keluar</p>
              </CardContent>
            </Card>
            <Card className="border-0 bg-white shadow-lg shadow-orange-500/10">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-orange-500/30">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <p className="text-base font-display font-bold text-stone-900">{periode}</p>
                <p className="text-xs text-stone-500 mt-1 font-medium">Periode Aktif</p>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {arisan.length === 0 ? (
            <Card className="border-0 bg-white">
              <CardContent className="p-12 text-center">
                <Trophy className="h-16 w-16 mx-auto text-stone-300 mb-4" />
                <p className="text-stone-500">Belum ada pemenang arisan yang dicatat.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {arisan.map((peserta, idx) => (
                <Card
                  key={peserta.id}
                  className={`group border-0 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden ${
                    idx === 0
                      ? 'bg-gradient-to-br from-red-500 via-orange-500 to-amber-500 text-white shadow-xl shadow-orange-500/30'
                      : 'bg-white hover:shadow-xl hover:shadow-orange-500/10'
                  }`}
                >
                  <CardContent className="p-5 md:p-6">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 font-display font-extrabold text-xl md:text-2xl shadow-lg ${
                          idx === 0
                            ? 'bg-white text-orange-600'
                            : 'bg-gradient-to-br from-red-500 to-orange-500 text-white shadow-orange-500/30'
                        }`}
                      >
                        {peserta.nomor_urut}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className={`font-display font-bold text-base md:text-lg ${idx === 0 ? 'text-white' : 'text-stone-900'}`}>
                            {peserta.nama}
                          </h3>
                          {idx === 0 && (
                            <Badge className="bg-white text-orange-600 hover:bg-white border-0 font-semibold text-xs">
                              <Trophy className="h-3 w-3 mr-1" />
                              Terbaru
                            </Badge>
                          )}
                        </div>
                        <div className={`flex flex-wrap items-center gap-3 text-xs md:text-sm ${idx === 0 ? 'text-orange-100' : 'text-stone-500'}`}>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {formatTanggal(peserta.tanggal_keluar)}
                          </span>
                          {peserta.nominal && (
                            <span className={`font-semibold ${idx === 0 ? 'text-white' : 'text-orange-600'}`}>
                              {formatRupiah(peserta.nominal)}
                            </span>
                          )}
                        </div>
                        {peserta.keterangan && (
                          <p className={`text-xs mt-2 ${idx === 0 ? 'text-orange-100' : 'text-stone-500'}`}>
                            {peserta.keterangan}
                          </p>
                        )}
                      </div>

                      {idx === 0 && (
                        <Trophy className="h-8 w-8 md:h-10 md:w-10 text-white/30 hidden sm:block" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}