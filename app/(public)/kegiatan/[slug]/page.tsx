import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, ArrowLeft, ImageIcon } from 'lucide-react'
import { dummyKegiatan, dummyGaleri } from '@/lib/dummy-data'
import { formatTanggal } from '@/lib/format'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function DetailKegiatanPage({ params }: PageProps) {
  const { slug } = await params
  const kegiatan = dummyKegiatan.find((k) => k.slug === slug && k.status === 'published')

  if (!kegiatan) {
    notFound()
  }

  const galeriKegiatan = dummyGaleri
    .filter((g) => g.kegiatan_id === kegiatan.id)
    .sort((a, b) => a.urutan - b.urutan)

  // Kegiatan terkait (random 3 lain)
  const kegiatanLain = dummyKegiatan
    .filter((k) => k.id !== kegiatan.id && k.status === 'published')
    .slice(0, 3)

  return (
    <>
      {/* HERO IMAGE */}
      <section className="relative -mt-16 md:-mt-20">
        <div className="relative w-full h-[50vh] md:h-[70vh] min-h-[400px] overflow-hidden">
          {kegiatan.foto_header_url && (
            <Image
              src={kegiatan.foto_header_url}
              alt={kegiatan.judul}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />

          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-12 md:pb-16">
              <div className="max-w-4xl">
                <Link href="/kegiatan">
                  <Button
                    variant="outline"
                    size="sm"
                    className="mb-4 bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 rounded-full"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Kembali ke Kegiatan
                  </Button>
                </Link>

                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-white/95 backdrop-blur-sm text-orange-700 border-0 font-semibold">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatTanggal(kegiatan.tanggal_kegiatan)}
                  </Badge>
                  {kegiatan.lokasi && (
                    <Badge className="bg-white/95 backdrop-blur-sm text-orange-700 border-0 font-semibold">
                      <MapPin className="h-3 w-3 mr-1" />
                      {kegiatan.lokasi}
                    </Badge>
                  )}
                </div>

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-extrabold text-white leading-tight drop-shadow-lg">
                  {kegiatan.judul}
                </h1>

                {kegiatan.ringkasan && (
                  <p className="text-base md:text-lg text-white/90 mt-4 max-w-3xl drop-shadow-md">
                    {kegiatan.ringkasan}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DESKRIPSI */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-xl shadow-orange-500/10 overflow-hidden bg-white">
            <CardContent className="p-8 md:p-10 relative">
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-red-500 via-orange-500 to-amber-500" />
              <h2 className="text-2xl md:text-3xl font-display font-bold text-stone-900 mb-5">
                Tentang Kegiatan
              </h2>
              <div className="text-stone-700 leading-relaxed whitespace-pre-line text-base md:text-lg">
                {kegiatan.deskripsi}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* GALERI KEGIATAN */}
      {galeriKegiatan.length > 0 && (
        <section className="bg-orange-50/50 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <Badge className="mb-3 bg-orange-100 text-orange-700 hover:bg-orange-100 border-0 px-3 py-1 text-xs font-semibold">
                  📸 Dokumentasi
                </Badge>
                <h2 className="text-3xl md:text-4xl font-display font-extrabold text-stone-900">
                  Galeri <span className="text-gradient-sunset">Kegiatan</span>
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {galeriKegiatan.map((foto) => (
                  <div
                    key={foto.id}
                    className="group relative aspect-square overflow-hidden rounded-2xl bg-stone-200 shadow-md hover:shadow-2xl hover:shadow-orange-500/20 transition-all"
                  >
                    <Image
                      src={foto.foto_url}
                      alt={foto.caption || kegiatan.judul}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    {foto.caption && (
                      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition">
                        <p className="text-white text-xs font-medium">{foto.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* KEGIATAN LAIN */}
      {kegiatanLain.length > 0 && (
        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-display font-extrabold text-stone-900">
                Kegiatan <span className="text-gradient-sunset">Lainnya</span>
              </h2>
              <Link href="/kegiatan">
                <Button variant="outline" className="border-2 border-orange-300 text-orange-700 hover:bg-orange-50 rounded-full" size="sm">
                  Semua
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {kegiatanLain.map((k) => (
                <Link key={k.id} href={`/kegiatan/${k.slug}`} className="group">
                  <Card className="overflow-hidden h-full hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 group-hover:-translate-y-1 border-0 bg-white pt-0">
                    <div className="relative aspect-video w-full overflow-hidden bg-stone-100">
                      {k.foto_header_url && (
                        <Image
                          src={k.foto_header_url}
                          alt={k.judul}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      )}
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-display font-bold text-base mb-2 line-clamp-2 group-hover:text-orange-600 transition">
                        {k.judul}
                      </h3>
                      <span className="text-xs text-stone-500 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatTanggal(k.tanggal_kegiatan)}
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}