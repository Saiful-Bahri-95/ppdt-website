import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'
import { PageHeader } from '@/components/admin/page-header'
import { InformasiForm } from '../../informasi-form'
import type { InformasiBulanan } from '@/lib/types/database'

export const metadata = { title: 'Edit Pengumuman' }

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditInformasiPage({ params }: PageProps) {
  await requireAdmin()
  const { id } = await params
  const supabase = await createClient()

  const { data } = await supabase.from('informasi_bulanan').select('*').eq('id', id).single()
  if (!data) notFound()

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader
        title="Edit Pengumuman"
        description="Perbarui isi pengumuman"
        backHref="/admin/informasi"
      />
      <InformasiForm informasi={data as InformasiBulanan} />
    </div>
  )
}