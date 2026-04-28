import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'
import { PageHeader } from '@/components/admin/page-header'
import { EmptyState } from '@/components/admin/empty-state'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Edit, Eye, ImageOff, Plus } from 'lucide-react'
import { formatTanggal } from '@/lib/format'
import type { Kegiatan } from '@/lib/types/database'
import { DeleteKegiatanButton } from '../kegiatan/delete-kegiatan-button'

export const metadata = { title: 'Kelola Kegiatan' }

export default async function AdminKegiatanPage() {
  await requireAdmin()
  const supabase = await createClient()

  const { data: kegiatanList } = await supabase
    .from('kegiatan')
    .select('*')
    .order('tanggal_kegiatan', { ascending: false })

  const list = (kegiatanList || []) as Kegiatan[]

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="Kelola Kegiatan"
        description="Tambah, edit, dan hapus kegiatan PPDT"
        action={{ label: 'Tambah Kegiatan', href: '/admin/kegiatan/baru' }}
      />

      {list.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="Belum ada kegiatan"
          description="Mulai dokumentasikan kegiatan PPDT yang sudah dilakukan."
          action={{ label: 'Tambah Kegiatan Pertama', href: '/admin/kegiatan/baru' }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((k) => (
            <Card key={k.id} className="border-0 bg-white hover:shadow-xl hover:shadow-orange-500/10 transition overflow-hidden pt-0">
              <div className="relative aspect-video bg-stone-100">
                {k.foto_header_url ? (
                  <Image
                    src={k.foto_header_url}
                    alt={k.judul}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageOff className="h-8 w-8 text-stone-400" />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <Badge className={k.status === 'published' ? 'bg-green-500 text-white' : 'bg-stone-500 text-white'}>
                    {k.status === 'published' ? '✓ Published' : 'Draft'}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-display font-bold text-base mb-2 line-clamp-2 leading-tight">{k.judul}</h3>
                <div className="flex flex-col gap-1 text-xs text-stone-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-orange-500" />
                    {formatTanggal(k.tanggal_kegiatan)}
                  </span>
                  {k.lokasi && (
                    <span className="flex items-center gap-1 truncate">
                      <MapPin className="h-3 w-3 text-orange-500 flex-shrink-0" />
                      <span className="truncate">{k.lokasi}</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 pt-3 border-t border-stone-100">
                  {k.status === 'published' && (
                    <Link href={`/kegiatan/${k.slug}`} target="_blank">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-stone-500 hover:text-orange-600">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                  <Link href={`/admin/kegiatan/${k.id}/edit`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-stone-500 hover:text-orange-600">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <DeleteKegiatanButton id={k.id} judul={k.judul} fotoUrl={k.foto_header_url} />
                  <div className="flex-1" />
                  <Link href={`/admin/kegiatan/${k.id}/edit`}>
                    <Button size="sm" variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50 rounded-full">
                      Edit
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}