import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'
import { PageHeader } from '@/components/admin/page-header'
import { EmptyState } from '@/components/admin/empty-state'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Wallet, Edit, ArrowUpCircle, ArrowDownCircle, TrendingUp, TrendingDown } from 'lucide-react'
import { formatRupiah, formatTanggal } from '@/lib/format'
import type { TransaksiKeuangan } from '@/lib/types/database'
import { DeleteTransaksiButton } from './delete-transaksi-button'

export const metadata = { title: 'Kelola Keuangan' }

export default async function AdminKeuanganPage() {
  await requireAdmin()
  const supabase = await createClient()

  const { data } = await supabase
    .from('transaksi_keuangan')
    .select('*')
    .order('tanggal', { ascending: false })

  const list = (data || []) as TransaksiKeuangan[]

  const totalPemasukan = list.filter(t => t.jenis === 'pemasukan').reduce((acc, t) => acc + t.nominal, 0)
  const totalPengeluaran = list.filter(t => t.jenis === 'pengeluaran').reduce((acc, t) => acc + t.nominal, 0)
  const saldo = totalPemasukan - totalPengeluaran

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title="Kelola Keuangan"
        description="Catat semua transaksi keuangan PPDT"
        action={{ label: 'Tambah Transaksi', href: '/admin/keuangan/baru' }}
      />

      {/* Stats */}
      {list.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="border-0 bg-gradient-to-br from-red-600 via-orange-500 to-amber-500 text-white shadow-xl shadow-orange-500/30">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-1">
                <Wallet className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase">Saldo</span>
              </div>
              <p className="text-2xl font-display font-extrabold">{formatRupiah(saldo)}</p>
            </CardContent>
          </Card>
          <Card className="border-0 bg-white shadow-lg shadow-green-500/10">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-xs font-semibold uppercase text-stone-500">Pemasukan</span>
              </div>
              <p className="text-2xl font-display font-extrabold text-green-600">{formatRupiah(totalPemasukan)}</p>
            </CardContent>
          </Card>
          <Card className="border-0 bg-white shadow-lg shadow-red-500/10">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-1">
                <TrendingDown className="h-4 w-4 text-red-600" />
                <span className="text-xs font-semibold uppercase text-stone-500">Pengeluaran</span>
              </div>
              <p className="text-2xl font-display font-extrabold text-red-600">{formatRupiah(totalPengeluaran)}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {list.length === 0 ? (
        <EmptyState
          icon={Wallet}
          title="Belum ada transaksi"
          description="Mulai catat transaksi keuangan untuk transparansi anggota."
          action={{ label: 'Tambah Transaksi Pertama', href: '/admin/keuangan/baru' }}
        />
      ) : (
        <div className="space-y-2">
          {list.map((t) => (
            <Card key={t.id} className="border-0 bg-white hover:shadow-md transition">
              <CardContent className="p-4 md:p-5">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    t.jenis === 'pemasukan' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {t.jenis === 'pemasukan' ? <ArrowUpCircle className="h-5 w-5" /> : <ArrowDownCircle className="h-5 w-5" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-stone-900 truncate">
                      {t.keterangan || t.kategori}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                      <span>{formatTanggal(t.tanggal)}</span>
                      <span>•</span>
                      <span>{t.kategori}</span>
                    </div>
                  </div>

                  <p className={`font-display font-bold text-sm md:text-base whitespace-nowrap ${
                    t.jenis === 'pemasukan' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {t.jenis === 'pemasukan' ? '+' : '-'}{formatRupiah(t.nominal)}
                  </p>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Link href={`/admin/keuangan/${t.id}/edit`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-stone-500 hover:text-orange-600">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <DeleteTransaksiButton id={t.id} keterangan={t.keterangan || t.kategori} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}