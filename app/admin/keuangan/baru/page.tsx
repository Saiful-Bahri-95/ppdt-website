import { requireAdmin } from '@/lib/auth'
import { PageHeader } from '@/components/admin/page-header'
import { TransaksiForm } from '../transaksi-form'

export const metadata = { title: 'Tambah Transaksi' }

export default async function TambahTransaksiPage() {
  await requireAdmin()

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader
        title="Tambah Transaksi"
        description="Catat pemasukan atau pengeluaran"
        backHref="/admin/keuangan"
      />
      <TransaksiForm />
    </div>
  )
}