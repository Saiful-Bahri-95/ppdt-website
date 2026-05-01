'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'

const navigationLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/tentang', label: 'Tentang' },
  { href: '/informasi', label: 'Informasi' },
  { href: '/kegiatan', label: 'Kegiatan' },
  { href: '/galeri', label: 'Galeri' },
  { href: '/arisan', label: 'Arisan' },
  { href: '/keuangan', label: 'Keuangan' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'glass shadow-lg shadow-orange-500/10 border-b border-orange-200/50 dark:border-orange-900/30'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0 transition-transform group-hover:scale-110 group-hover:rotate-3 duration-300">
              <Image src="/logo-ppdt.png" alt="Logo PPDT" fill sizes="48px" className="object-contain" priority />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display font-extrabold text-lg md:text-xl text-gradient-sunset">
                PPDT
              </span>
              <span className="text-[10px] md:text-xs text-stone-600 dark:text-stone-400 hidden sm:block font-medium">
                Persatuan Pemuda Dukuh Tengah
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-semibold text-stone-700 dark:text-stone-300 hover:text-orange-600 dark:hover:text-orange-400 rounded-full transition-all duration-300 hover:bg-orange-50 dark:hover:bg-orange-950/50 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-red-600 to-orange-500 group-hover:w-1/2 group-hover:left-1/4 transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Right side: Theme Toggle + Mobile Menu */}
          <div className="flex items-center gap-1">
            <ThemeToggle />

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-orange-100 dark:hover:bg-orange-950/50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              ) : (
                <Menu className="h-5 w-5 text-stone-700 dark:text-stone-300" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300',
            mobileMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
          )}
        >
          <div className="flex flex-col gap-1 pt-2 border-t border-orange-200/50 dark:border-orange-900/30">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-semibold text-stone-700 dark:text-stone-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/50 rounded-xl transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}