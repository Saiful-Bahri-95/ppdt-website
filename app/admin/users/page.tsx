import { createClient } from '@/lib/supabase/server'
import { requireSuperAdmin } from '@/lib/auth'
import { PageHeader } from '@/components/admin/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users } from 'lucide-react'
import { formatTanggal } from '@/lib/format'
import type { Profile } from '@/lib/types/database'
import { ToggleActiveButton } from './toggle-active-button'

export const metadata = { title: 'Pengguna Admin' }

export default async function UsersPage() {
  await requireSuperAdmin()
  const supabase = await createClient()

  const { data } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  const profiles = (data || []) as Profile[]

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Pengguna Admin"
        description="Kelola admin yang dapat mengakses panel"
      />

      <Card className="border-0 bg-orange-50 mb-4">
        <CardContent className="p-4 text-sm text-stone-700">
          💡 <strong>Catatan:</strong> Untuk menambah admin baru, buat user baru di Supabase Dashboard → Authentication → Users → Add user. Setelah itu, edit role dan status di sini.
        </CardContent>
      </Card>

      {profiles.length === 0 ? (
        <Card className="border-0 bg-white">
          <CardContent className="p-12 text-center">
            <Users className="h-16 w-16 mx-auto text-stone-300 mb-4" />
            <p className="text-stone-500">Belum ada pengguna admin.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {profiles.map((p) => (
            <Card key={p.id} className="border-0 bg-white">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                    {p.nama_lengkap.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-display font-bold text-base">{p.nama_lengkap}</h3>
                      <Badge className={
                        p.role === 'super_admin' ? 'bg-red-500 text-white' :
                        p.role === 'admin' ? 'bg-orange-500 text-white' :
                        'bg-amber-500 text-white'
                      }>
                        {p.role.replace('_', ' ')}
                      </Badge>
                      {!p.is_active && (
                        <Badge className="bg-stone-500 text-white">Nonaktif</Badge>
                      )}
                    </div>
                    <div className="text-xs text-stone-500">
                      {p.jabatan && <span>{p.jabatan} • </span>}
                      Bergabung {formatTanggal(p.created_at)}
                    </div>
                  </div>

                  {p.role !== 'super_admin' && (
                    <ToggleActiveButton id={p.id} isActive={p.is_active} nama={p.nama_lengkap} />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}