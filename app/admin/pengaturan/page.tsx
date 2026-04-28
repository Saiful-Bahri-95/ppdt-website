import { createClient } from '@/lib/supabase/server'
import { requireSuperAdmin } from '@/lib/auth'
import { PageHeader } from '@/components/admin/page-header'
import { PengaturanForm } from './pengaturan-form'
import type { PengaturanOrganisasi } from '@/lib/types/database'

export const metadata = { title: 'Pengaturan Organisasi' }

export default async function PengaturanPage() {
  await requireSuperAdmin()
  const supabase = await createClient()

  const { data } = await supabase.from('pengaturan_organisasi').select('*').eq('id', 1).single()

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader
        title="Pengaturan Organisasi"
        description="Atur informasi umum organisasi PPDT"
      />
      <PengaturanForm pengaturan={data as PengaturanOrganisasi} />
    </div>
  )
}