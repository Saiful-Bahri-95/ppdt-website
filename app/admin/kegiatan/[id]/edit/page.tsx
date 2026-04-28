import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'
import { PageHeader } from '@/components/admin/page-header'
import { KegiatanForm } from '../../kegiatan-form'
import type { Kegiatan } from '@/lib/types/database'

export const metadata = { title: 'Edit Kegiatan' }

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditKegiatanPage({ params }: PageProps) {
  await requireAdmin()
  const { id } = await params
  const supabase = await createClient()

  const { data: kegiatan } = await supabase
    .from('kegiatan')
    .select('*')
    .eq('id', id)
    .single()

  if (!kegiatan) notFound()

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader
        title="Edit Kegiatan"
        description="Perbarui informasi kegiatan"
        backHref="/admin/kegiatan"
      />
      <KegiatanForm kegiatan={kegiatan as Kegiatan} />
    </div>
  )
}