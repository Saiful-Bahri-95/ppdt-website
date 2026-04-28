import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'
import { PageHeader } from '@/components/admin/page-header'
import { ArisanForm } from '../../arisan-form'
import type { PesertaArisan } from '@/lib/types/database'

export const metadata = { title: 'Edit Pemenang Arisan' }

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditArisanPage({ params }: PageProps) {
  await requireAdmin()
  const { id } = await params
  const supabase = await createClient()

  const { data } = await supabase.from('peserta_arisan').select('*').eq('id', id).single()
  if (!data) notFound()

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader title="Edit Pemenang Arisan" backHref="/admin/arisan" />
      <ArisanForm peserta={data as PesertaArisan} />
    </div>
  )
}