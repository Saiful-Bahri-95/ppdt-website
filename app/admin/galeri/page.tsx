import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'
import { PageHeader } from '@/components/admin/page-header'
import { EmptyState } from '@/components/admin/empty-state'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ImageIcon } from 'lucide-react'
import { DeleteFotoButton } from './delete-foto-button'

export const metadata = { title: 'Kelola Galeri' }

interface GaleriDenganKegiatan {
  id: string
  foto_url: string
  caption: string | null
  kegiatan_id: string | null
  created_at: string
  kegiatan: { judul: string } | null
}

export default async function AdminGaleriPage() {
  await requireAdmin()
  const supabase = await createClient()

  const { data } = await supabase
    .from('galeri_foto')
    .select('id, foto_url, caption, kegiatan_id, created_at, kegiatan:kegiatan_id(judul)')
    .order('created_at', { ascending: false })

  const galeri = (data || []) as unknown as GaleriDenganKegiatan[]

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="Kelola Galeri"
        description="Upload dan kelola foto-foto kegiatan PPDT"
        action={{ label: 'Upload Foto', href: '/admin/galeri/baru' }}
      />

      {galeri.length === 0 ? (
        <EmptyState
          icon={ImageIcon}
          title="Belum ada foto"
          description="Mulai dokumentasikan kegiatan dengan upload foto."
          action={{ label: 'Upload Foto Pertama', href: '/admin/galeri/baru' }}
        />
      ) : (
        <>
          <p className="text-sm text-stone-500 mb-4">Total: <span className="font-semibold text-orange-600">{galeri.length} foto</span></p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {galeri.map((foto) => (
              <Card key={foto.id} className="border-0 bg-white overflow-hidden group hover:shadow-lg transition pt-0">
                <div className="relative aspect-square bg-stone-100">
                  <Image
                    src={foto.foto_url}
                    alt={foto.caption || 'Galeri PPDT'}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
                    <DeleteFotoButton id={foto.id} fotoUrl={foto.foto_url} />
                  </div>
                </div>
                <CardContent className="p-3">
                  {foto.kegiatan && (
                    <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-0 mb-1.5 text-xs">
                      {foto.kegiatan.judul}
                    </Badge>
                  )}
                  {foto.caption && (
                    <p className="text-xs text-stone-600 line-clamp-2">{foto.caption}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}