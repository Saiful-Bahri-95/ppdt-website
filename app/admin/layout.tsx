import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AdminShell } from '../admin/admin-shell'
import type { Profile } from '@/lib/types/database'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Pengecualian: halaman /admin/login tidak butuh auth
  // (cek dilakukan di proxy.ts middleware)

  if (!user) {
    return <>{children}</>
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile || !profile.is_active) {
    redirect('/admin/login')
  }

  return <AdminShell profile={profile as Profile}>{children}</AdminShell>
}