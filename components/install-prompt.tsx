'use client'

import { useEffect, useState } from 'react'
import { X, Download, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

const STORAGE_KEY = 'ppdt-install-prompt-dismissed'
const DISMISS_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 hari

export function InstallPrompt() {
  const [installPromptEvent, setInstallPromptEvent] = useState<BeforeInstallPromptEvent | null>(null)
  const [showBanner, setShowBanner] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase()
    const isiOS = /iphone|ipad|ipod/.test(userAgent)
    setIsIOS(isiOS)

    // Detect if already installed (standalone mode)
    const isInStandalone = window.matchMedia('(display-mode: standalone)').matches ||
      // @ts-expect-error iOS Safari standalone property
      window.navigator.standalone === true
    setIsStandalone(isInStandalone)

    // Check dismissed timestamp
    const dismissedAt = localStorage.getItem(STORAGE_KEY)
    if (dismissedAt) {
      const elapsed = Date.now() - Number(dismissedAt)
      if (elapsed < DISMISS_DURATION) return
    }

    // Listen for install prompt event (Chrome/Edge/Android)
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault()
      setInstallPromptEvent(e as BeforeInstallPromptEvent)

      // Tampilkan banner setelah 5 detik (biar tidak ganggu)
      setTimeout(() => setShowBanner(true), 5000)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstall)

    // Untuk iOS, tampilkan banner setelah 5 detik kalau belum di-install
    if (isiOS && !isInStandalone) {
      setTimeout(() => setShowBanner(true), 5000)
    }

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
  }, [])

  function handleDismiss() {
    setShowBanner(false)
    localStorage.setItem(STORAGE_KEY, String(Date.now()))
  }

  async function handleInstall() {
    if (!installPromptEvent) return

    await installPromptEvent.prompt()
    const { outcome } = await installPromptEvent.userChoice

    if (outcome === 'accepted') {
      setShowBanner(false)
      setInstallPromptEvent(null)
    }
  }

  // Tidak tampilkan kalau sudah install
  if (isStandalone) return null
  if (!showBanner) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 animate-in slide-in-from-bottom-5 fade-in duration-500">
      <div className="bg-stone-900 border border-orange-900/50 rounded-2xl shadow-2xl shadow-orange-500/20 p-4 backdrop-blur-md">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/30">
            <Smartphone className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-sm text-stone-50 mb-1">
              Install Aplikasi PPDT
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              {isIOS
                ? 'Tekan tombol Share di Safari, lalu pilih "Add to Home Screen" untuk akses lebih cepat.'
                : 'Akses lebih cepat dan offline-ready. Install sekarang!'}
            </p>
          </div>
          <button
            onClick={handleDismiss}
            className="text-stone-500 hover:text-stone-300 transition flex-shrink-0"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {!isIOS && installPromptEvent && (
          <div className="flex gap-2 mt-3">
            <Button
              onClick={handleInstall}
              size="sm"
              className="flex-1 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white shadow-md rounded-full h-9 text-xs"
            >
              <Download className="h-3.5 w-3.5 mr-1.5" />
              Install Sekarang
            </Button>
            <Button
              onClick={handleDismiss}
              size="sm"
              variant="ghost"
              className="text-stone-400 hover:text-stone-200 hover:bg-stone-800 rounded-full h-9 text-xs"
            >
              Nanti
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}