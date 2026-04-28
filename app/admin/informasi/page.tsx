import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'
import { PageHeader } from '@/components/admin/page-header'
import { EmptyState } from '@/components/admin/empty-state'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Megaphone, Edit, Eye } from 'lucide-react'
import { formatPeriode, formatTanggal, truncate } from '@/lib/format'
import type { InformasiBulanan } from '@/lib/types/database'
import { DeleteInformasiButton } from '../informasi/delete-informasi-button'

export const metadata = { title: 'Kelola Informasi' }

export default async function AdminInformasiPage() {
  await requireAdmin()
  const supabase = await createClient()

  const { data } = await supabase
    .from('informasi_bulanan')
    .select('*')
    .order('tahun', { ascending: false })
    .order('bulan', { ascending: false })

  const list = (data || []) as InformasiBulanan[]

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title="Kelola Informasi"
        description="Pengumuman dan informasi bulanan untuk anggota PPDT"
        action={{ label: 'Tulis Pengumuman', href: '/admin/informasi/baru' }}
      />

      {list.length === 0 ? (
        <EmptyState
          icon={Megaphone}
          title="Belum ada pengumuman"
          description="Mulai sampaikan informasi bulanan kepada anggota PPDT."
          action={{ label: 'Tulis Pengumuman Pertama', href: '/admin/informasi/baru' }}
        />
      ) : (
        <div className="space-y-3">
          {list.map((info) => (
            <Card key={info.id} className="border-0 bg-white hover:shadow-lg transition">
              <CardContent className="p-5 md:p-6">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-md">
                    <Megaphone className="h-5 w-5 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-0">
                        {formatPeriode(info.bulan, info.tahun)}
                      </Badge>
                      <Badge className={info.status === 'published' ? 'bg-green-500 text-white' : 'bg-stone-500 text-white'}>
                        {info.status === 'published' ? '✓ Published' : 'Draft'}
                      </Badge>
                    </div>
                    <h3 className="font-display font-bold text-base md:text-lg mb-1.5">{info.judul}</h3>
                    <p className="text-sm text-stone-600 line-clamp-2">{truncate(info.isi, 200)}</p>
                    {info.published_at && (
                      <p className="text-xs text-stone-400 mt-2">
                        Dipublikasikan {formatTanggal(info.published_at)}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Link href={`/admin/informasi/${info.id}/edit`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-stone-500 hover:text-orange-600">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <DeleteInformasiButton id={info.id} judul={info.judul} />
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