import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AdminShell } from './admin-shell'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Login page is exception — handled by middleware
  if (!user) {
    return <div className="min-h-screen bg-stone-950">{children}</div>
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile || !profile.is_active) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-stone-950">
      <AdminShell profile={profile}>
        {children}
      </AdminShell>
    </div>
  )
}