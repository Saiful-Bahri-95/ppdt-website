'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  Calendar,
  Image as ImageIcon,
  Megaphone,
  Trophy,
  Wallet,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import type { Profile } from '@/lib/types/database'

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/kegiatan', label: 'Kegiatan', icon: Calendar },
  { href: '/admin/galeri', label: 'Galeri', icon: ImageIcon },
  { href: '/admin/informasi', label: 'Informasi', icon: Megaphone },
  { href: '/admin/arisan', label: 'Arisan', icon: Trophy },
  { href: '/admin/keuangan', label: 'Keuangan', icon: Wallet },
]

const superAdminMenuItems = [
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

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    toast.success('Berhasil logout')
    router.push('/admin/login')
    router.refresh()
  }

  const allMenu = [
    ...menuItems,
    ...(profile.role === 'super_admin' ? superAdminMenuItems : []),
  ]

  return (
    <div className="flex min-h-screen bg-stone-950">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-64 fixed left-0 top-0 bottom-0 bg-stone-900 border-r border-stone-800 z-30">
        <div className="p-5 border-b border-stone-800">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex-shrink-0 transition-transform group-hover:scale-110 duration-300">
              <Image src="/logo-ppdt.png" alt="Logo PPDT" fill sizes="40px" className="object-contain" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display font-extrabold text-lg text-gradient-sunset">PPDT</span>
              <span className="text-xs text-stone-500 font-medium">Admin Panel</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {allMenu.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href ||
              (item.href !== '/admin' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                  isActive
                    ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg shadow-orange-500/30'
                    : 'text-stone-400 hover:text-orange-400 hover:bg-stone-800'
                )}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-stone-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-stone-400 hover:text-orange-400 hover:bg-stone-800 transition"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Lihat Website
          </Link>

          <div className="px-3 py-2 rounded-xl bg-stone-800">
            <p className="text-xs font-semibold text-stone-100 truncate">{profile.nama_lengkap}</p>
            <p className="text-xs text-stone-500 capitalize">{profile.role.replace('_', ' ')}</p>
          </div>

          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-stone-400 hover:text-red-400 hover:bg-red-950/50 h-9"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          'lg:hidden fixed top-0 left-0 bottom-0 w-72 bg-stone-900 z-50 transform transition-transform duration-300 flex flex-col',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="p-5 border-b border-stone-800 flex items-center justify-between">
          <Link href="/admin" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image src="/logo-ppdt.png" alt="Logo PPDT" fill sizes="40px" className="object-contain" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display font-extrabold text-lg text-gradient-sunset">PPDT</span>
              <span className="text-xs text-stone-500 font-medium">Admin Panel</span>
            </div>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="text-stone-400 hover:bg-stone-800">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {allMenu.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href ||
              (item.href !== '/admin' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all',
                  isActive
                    ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg'
                    : 'text-stone-400 hover:text-orange-400 hover:bg-stone-800'
                )}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-stone-800 space-y-2">
          <div className="px-3 py-2 rounded-xl bg-stone-800">
            <p className="text-xs font-semibold text-stone-100 truncate">{profile.nama_lengkap}</p>
            <p className="text-xs text-stone-500 capitalize">{profile.role.replace('_', ' ')}</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-stone-400 hover:text-red-400 hover:bg-red-950/50 h-9"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 min-w-0">
        {/* Topbar Mobile */}
        <header className="lg:hidden sticky top-0 z-20 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            className="text-stone-300 hover:bg-stone-800"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/admin" className="flex items-center gap-2">
            <Image src="/logo-ppdt.png" alt="Logo" width={28} height={28} className="object-contain" />
            <span className="font-display font-bold text-gradient-sunset">PPDT Admin</span>
          </Link>
          <div className="w-9" /> {/* Spacer for balance */}
        </header>

        <main className="p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}