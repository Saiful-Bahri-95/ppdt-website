import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Sparkles, ArrowRight } from 'lucide-react'
import { dummyKegiatan } from '@/lib/dummy-data'
import { formatTanggal, truncate } from '@/lib/format'

export default function KegiatanPage() {
  const kegiatan = [...dummyKegiatan]
    .filter((k) => k.status === 'published')
    .sort((a, b) => new Date(b.tanggal_kegiatan).getTime() - new Date(a.tanggal_kegiatan).getTime())

  return (
    <>
      {/* HERO */}
      <section className="relative bg-mesh-sunset py-16 md:py-20 -mt-16 md:-mt-20 pt-28 md:pt-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md border border-orange-200 rounded-full px-4 py-1.5 mb-6 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-orange-600" />
              <span className="text-xs font-semibold text-stone-700">Kegiatan PPDT</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold mb-4 leading-tight">
              <span className="text-gradient-sunset">Jejak Karya</span>
              <br />
              <span className="text-stone-900">Kami</span>
            </h1>
            <p className="text-base md:text-lg text-stone-600 leading-relaxed">
              Berbagai kegiatan yang telah kami selenggarakan untuk masyarakat Dukuh Tengah.
            </p>
          </div>
        </div>
      </section>

      {/* LIST KEGIATAN */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        {kegiatan.length === 0 ? (
          <Card className="border-0 bg-white max-w-md mx-auto">
            <CardContent className="p-12 text-center">
              <Calendar className="h-16 w-16 mx-auto text-stone-300 mb-4" />
              <p className="text-stone-500">Belum ada kegiatan yang dipublikasikan.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kegiatan.map((k) => (
              <Link key={k.id} href={`/kegiatan/${k.slug}`} className="group">
                <Card className="overflow-hidden h-full hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 group-hover:-translate-y-2 border-0 bg-white pt-0">
                  <div className="relative aspect-video w-full overflow-hidden bg-stone-100">
                    {k.foto_header_url && (
                      <Image
                        src={k.foto_header_url}
                        alt={k.judul}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                      <Badge className="bg-white/95 backdrop-blur-sm text-orange-700 border-0 font-semibold text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatTanggal(k.tanggal_kegiatan)}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-display font-bold text-xl mb-3 line-clamp-2 group-hover:text-orange-600 transition leading-tight">
                      {k.judul}
                    </h3>
                    <p className="text-sm text-stone-600 mb-4 line-clamp-3 leading-relaxed">
                      {k.ringkasan || truncate(k.deskripsi, 150)}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                      {k.lokasi && (
                        <span className="flex items-center gap-1.5 text-xs text-stone-500 truncate flex-1">
                          <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-orange-500" />
                          <span className="truncate">{k.lokasi}</span>
                        </span>
                      )}
                      <span className="text-xs font-semibold text-orange-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                        Detail
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  )
}