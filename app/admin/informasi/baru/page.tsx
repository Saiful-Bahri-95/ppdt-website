import { requireAdmin } from '@/lib/auth'
import { PageHeader } from '@/components/admin/page-header'
import { InformasiForm } from '../informasi-form'

export const metadata = { title: 'Tulis Pengumuman' }

export default async function TambahInformasiPage() {
  await requireAdmin()

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader
        title="Tulis Pengumuman Baru"
        description="Sampaikan informasi terkini kepada anggota PPDT"
        backHref="/admin/informasi"
      />
      <InformasiForm />
    </div>
  )
}