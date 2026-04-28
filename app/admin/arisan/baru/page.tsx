import { requireAdmin } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/admin/page-header'
import { ArisanForm } from '../arisan-form'

export const metadata = { title: 'Tambah Pemenang Arisan' }

export default async function TambahArisanPage() {
  await requireAdmin()
  const supabase = await createClient()

  // Get nomor urut terakhir
  const { data: lastEntry } = await supabase
    .from('peserta_arisan')
    .select('nomor_urut, periode_arisan')
    .order('nomor_urut', { ascending: false })
    .limit(1)
    .maybeSingle()

  const nextNomor = (lastEntry?.nomor_urut || 0) + 1
  const lastPeriode = lastEntry?.periode_arisan || ''

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader
        title="Tambah Pemenang Arisan"
        description="Catat pemenang arisan terbaru"
        backHref="/admin/arisan"
      />
      <ArisanForm nextNomor={nextNomor} lastPeriode={lastPeriode} />
    </div>
  )
}