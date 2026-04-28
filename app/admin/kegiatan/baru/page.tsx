import { requireAdmin } from '@/lib/auth'
import { PageHeader } from '@/components/admin/page-header'
import { KegiatanForm } from '../kegiatan-form'

export const metadata = { title: 'Tambah Kegiatan' }

export default async function TambahKegiatanPage() {
  await requireAdmin()

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader
        title="Tambah Kegiatan Baru"
        description="Dokumentasikan kegiatan PPDT yang baru saja diselenggarakan"
        backHref="/admin/kegiatan"
      />
      <KegiatanForm />
    </div>
  )
}