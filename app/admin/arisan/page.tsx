import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'
import { PageHeader } from '@/components/admin/page-header'
import { EmptyState } from '@/components/admin/empty-state'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Trophy, Edit, Calendar } from 'lucide-react'
import { formatTanggal, formatRupiah } from '@/lib/format'
import type { PesertaArisan } from '@/lib/types/database'
import { DeleteArisanButton } from './delete-arisan-button'

export const metadata = { title: 'Kelola Arisan' }

export default async function AdminArisanPage() {
  await requireAdmin()
  const supabase = await createClient()

  const { data } = await supabase
    .from('peserta_arisan')
    .select('*')
    .order('tanggal_keluar', { ascending: false })

  const list = (data || []) as PesertaArisan[]

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title="Kelola Arisan"
        description="Catat pemenang arisan rutin PPDT"
        action={{ label: 'Tambah Pemenang', href: '/admin/arisan/baru' }}
      />

      {list.length === 0 ? (
        <EmptyState
          icon={Trophy}
          title="Belum ada pemenang arisan"
          description="Catat pemenang arisan untuk transparansi anggota."
          action={{ label: 'Tambah Pemenang Pertama', href: '/admin/arisan/baru' }}
        />
      ) : (
        <div className="space-y-3">
          {list.map((peserta, idx) => (
            <Card key={peserta.id} className={`border-0 transition-all overflow-hidden ${
              idx === 0
                ? 'bg-gradient-to-br from-red-500 via-orange-500 to-amber-500 text-white shadow-xl shadow-orange-500/30'
                : 'bg-white hover:shadow-lg'
            }`}>
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 font-display font-extrabold text-xl shadow-lg ${
                    idx === 0
                      ? 'bg-white text-orange-600'
                      : 'bg-gradient-to-br from-red-500 to-orange-500 text-white shadow-orange-500/30'
                  }`}>
                    {peserta.nomor_urut}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className={`font-display font-bold text-base ${idx === 0 ? 'text-white' : 'text-stone-900'}`}>
                        {peserta.nama}
                      </h3>
                      {idx === 0 && (
                        <Badge className="bg-white text-orange-600 hover:bg-white border-0 font-semibold text-xs">
                          <Trophy className="h-3 w-3 mr-1" />
                          Terbaru
                        </Badge>
                      )}
                    </div>
                    <div className={`flex flex-wrap items-center gap-3 text-xs ${idx === 0 ? 'text-orange-100' : 'text-stone-500'}`}>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatTanggal(peserta.tanggal_keluar)}
                      </span>
                      <span>{peserta.periode_arisan}</span>
                      {peserta.nominal && (
                        <span className={`font-semibold ${idx === 0 ? 'text-white' : 'text-orange-600'}`}>
                          {formatRupiah(peserta.nominal)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Link href={`/admin/arisan/${peserta.id}/edit`}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-8 w-8 ${idx === 0 ? 'text-white hover:bg-white/20' : 'text-stone-500 hover:text-orange-600'}`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <DeleteArisanButton id={peserta.id} nama={peserta.nama} dark={idx === 0} />
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