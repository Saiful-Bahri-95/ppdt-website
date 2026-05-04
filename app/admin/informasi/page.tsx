import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'
import { PageHeader } from '@/components/admin/page-header'
import { EmptyState } from '@/components/admin/empty-state'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Megaphone, Edit } from 'lucide-react'
import { formatPeriode, formatTanggal } from '@/lib/format'
import type { InformasiBulanan } from '@/lib/types/database'
import { DeleteInformasiButton } from './delete-informasi-button'

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
        description="Pengumuman dan informasi bulanan untuk anggota"
        action={{ label: 'Tulis Pengumuman', href: '/admin/informasi/baru' }}
      />

      {list.length === 0 ? (
        <EmptyState
          icon={Megaphone}
          title="Belum ada pengumuman"
          description="Buat pengumuman bulanan agar anggota selalu update."
          action={{ label: 'Tulis Pengumuman Pertama', href: '/admin/informasi/baru' }}
        />
      ) : (
        <div className="space-y-3">
          {list.map((info) => (
            <Card key={info.id} className="border-0 bg-stone-900 hover:shadow-lg transition">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-md">
                    <Megaphone className="h-5 w-5 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-display font-bold text-base text-stone-50">{info.judul}</h3>
                      <Badge className={info.status === 'published'
                        ? 'bg-green-950/50 text-green-400 border border-green-900'
                        : 'bg-stone-800 text-stone-400 border border-stone-700'}>
                        {info.status === 'published' ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-stone-400 mb-2">
                      <span>{formatPeriode(info.bulan, info.tahun)}</span>
                      {info.published_at && <span>Dipublish {formatTanggal(info.published_at)}</span>}
                    </div>
                    <p className="text-sm text-stone-300 line-clamp-2 leading-relaxed">{info.isi}</p>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Link href={`/admin/informasi/${info.id}/edit`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-stone-400 hover:text-orange-400 hover:bg-stone-800">
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