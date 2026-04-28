import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'
import { PageHeader } from '@/components/admin/page-header'
import { TransaksiForm } from '../../transaksi-form'
import type { TransaksiKeuangan } from '@/lib/types/database'

export const metadata = { title: 'Edit Transaksi' }

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditTransaksiPage({ params }: PageProps) {
  await requireAdmin()
  const { id } = await params
  const supabase = await createClient()

  const { data } = await supabase.from('transaksi_keuangan').select('*').eq('id', id).single()
  if (!data) notFound()

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader title="Edit Transaksi" backHref="/admin/keuangan" />
      <TransaksiForm transaksi={data as TransaksiKeuangan} />
    </div>
  )
}