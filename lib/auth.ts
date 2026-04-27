import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { Profile } from './types/database'

/**
 * Get user yang sedang login. Redirect ke /admin/login kalau belum login.
 */
export async function requireUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return user
}

/**
 * Get profile lengkap user yang sedang login.
 * Redirect ke /admin/login kalau belum login atau profile tidak aktif.
 */
export async function requireProfile(): Promise<Profile> {
  const user = await requireUser()
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile || !profile.is_active) {
    redirect('/admin/login')
  }

  return profile as Profile
}

/**
 * Cek apakah user adalah admin (admin/super_admin/editor)
 */
export async function requireAdmin(): Promise<Profile> {
  const profile = await requireProfile()

  if (!['super_admin', 'admin', 'editor'].includes(profile.role)) {
    redirect('/admin/login')
  }

  return profile
}

/**
 * Cek apakah user adalah super_admin
 */
export async function requireSuperAdmin(): Promise<Profile> {
  const profile = await requireProfile()

  if (profile.role !== 'super_admin') {
    redirect('/admin')
  }

  return profile
}