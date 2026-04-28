import Image from 'next/image'
import { Sparkles, ImageIcon } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata = { title: 'Galeri' }

export default async function GaleriPage() {
  const supabase = await createClient()

  const { data } = await supabase
    .from('galeri_foto')
    .select('id, foto_url, caption, kegiatan:kegiatan_id(judul)')
    .order('created_at', { ascending: false })

  const galeri = (data || []) as unknown as Array<{
    id: string
    foto_url: string
    caption: string | null
    kegiatan: { judul: string } | null
  }>

  return (
    <>
      <section className="relative bg-mesh-sunset py-16 md:py-20 -mt-16 md:-mt-20 pt-28 md:pt-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-20 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md border border-orange-200 rounded-full px-4 py-1.5 mb-6 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-orange-600" />
              <span className="text-xs font-semibold text-stone-700">Galeri Foto</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold mb-4 leading-tight">
              <span className="text-gradient-sunset">Momen</span>
              <br />
              <span className="text-stone-900">Bersama Kami</span>
            </h1>
            <p className="text-base md:text-lg text-stone-600 leading-relaxed">
              Kumpulan dokumentasi visual dari berbagai kegiatan PPDT.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16">
        {galeri.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-12">
            <ImageIcon className="h-16 w-16 mx-auto text-stone-300 mb-4" />
            <p className="text-stone-500">Belum ada foto di galeri.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {galeri.map((foto) => (
              <div
                key={foto.id}
                className="group relative aspect-square overflow-hidden rounded-2xl bg-stone-200 shadow-md hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:-translate-y-1"
              >
                <Image
                  src={foto.foto_url}
                  alt={foto.caption || 'Galeri PPDT'}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end">
                  <div className="p-4 text-white">
                    {foto.caption && (
                      <p className="text-sm font-semibold mb-1 line-clamp-2">{foto.caption}</p>
                    )}
                    {foto.kegiatan && (
                      <p className="text-xs text-orange-200 line-clamp-1">{foto.kegiatan.judul}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  )
}