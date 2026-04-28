import { requireAdmin } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/admin/page-header'
import { GaleriUploadForm } from './galeri-upload-form'
import type { Kegiatan } from '@/lib/types/database'

export const metadata = { title: 'Upload Foto Galeri' }

export default async function GaleriBaruPage() {
  await requireAdmin()
  const supabase = await createClient()

  const { data } = await supabase
    .from('kegiatan')
    .select('id, judul, tanggal_kegiatan')
    .order('tanggal_kegiatan', { ascending: false })

  const kegiatanList = (data || []) as Pick<Kegiatan, 'id' | 'judul' | 'tanggal_kegiatan'>[]

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader
        title="Upload Foto Galeri"
        description="Upload satu atau beberapa foto sekaligus"
        backHref="/admin/galeri"
      />
      <GaleriUploadForm kegiatanList={kegiatanList} />
    </div>
  )
}