'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Calendar,
  Image as ImageIcon,
  Megaphone,
  Trophy,
  Wallet,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Users,
  LucideIcon,
} from 'lucide-react'
import { toast } from 'sonner'
import type { Profile } from '@/lib/types/database'

type SidebarLink = {
  href: string
  label: string
  icon: LucideIcon
  exact?: boolean
}

const sidebarLinks: SidebarLink[] = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/kegiatan', label: 'Kegiatan', icon: Calendar },
  { href: '/admin/galeri', label: 'Galeri', icon: ImageIcon },
  { href: '/admin/informasi', label: 'Informasi', icon: Megaphone },
  { href: '/admin/arisan', label: 'Arisan', icon: Trophy },
  { href: '/admin/keuangan', label: 'Keuangan', icon: Wallet },
]

const superAdminLinks: SidebarLink[] = [
  { href: '/admin/users', label: 'Pengguna', icon: Users },
  { href: '/admin/pengaturan', label: 'Pengaturan', icon: Settings },
]

export function AdminShell({
  profile,
  children,
}: {
  profile: Profile
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isSuperAdmin = profile.role === 'super_admin'
  const allLinks = isSuperAdmin ? [...sidebarLinks, ...superAdminLinks] : sidebarLinks

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    toast.success('Berhasil logout!')
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-white border-r border-stone-200 flex flex-col transition-transform duration-300',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-stone-200">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image src="/logo-ppdt.png" alt="PPDT" fill className="object-contain" />
            </div>
            <div>
              <p className="font-display font-extrabold text-sm leading-none text-gradient-sunset">PPDT</p>
              <p className="text-[10px] text-stone-500 mt-0.5">Admin Panel</p>
            </div>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-8 w-8"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* User info */}
        <div className="p-4 border-b border-stone-200">
          <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {profile.nama_lengkap.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-sm text-stone-900 truncate">{profile.nama_lengkap}</p>
              <p className="text-xs text-orange-600 capitalize font-medium">{profile.role.replace('_', ' ')}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {allLinks.map((link) => {
            const Icon = link.icon
            const isActive = link.exact
              ? pathname === link.href
              : pathname.startsWith(link.href)

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all',
                  isActive
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-orange-500/30'
                    : 'text-stone-700 hover:bg-orange-50 hover:text-orange-600'
                )}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Bottom actions */}
        <div className="p-3 border-t border-stone-200 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-stone-700 hover:bg-orange-50 hover:text-orange-600 transition"
          >
            <ExternalLink className="h-4 w-4" />
            Lihat Website
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 h-16 flex items-center justify-between px-4 lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex-1 lg:flex-initial" />

          <div className="text-xs text-stone-500 hidden sm:block">
            {new Date().toLocaleDateString('id-ID', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  )
}