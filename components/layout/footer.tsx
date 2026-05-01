import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Mail } from 'lucide-react'

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
    </svg>
  )
}

export function Footer() {
  const tahunIni = new Date().getFullYear()

  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* Wave SVG separator */}
      <div className="absolute top-0 left-0 right-0 -translate-y-px">
        <svg className="w-full h-12 fill-orange-50" preserveAspectRatio="none" viewBox="0 0 1440 48">
          <path d="M0,48 C240,0 480,0 720,24 C960,48 1200,48 1440,0 L1440,48 L0,48 Z" />
        </svg>
      </div>

      <div className="bg-gradient-to-br from-red-700 via-red-600 to-orange-600 text-white relative">
        {/* Decorative blobs */}
        <div className="absolute inset-0 opacity-20 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-400 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-yellow-400 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="container mx-auto px-4 py-16 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-14 h-14 bg-white rounded-2xl p-1 shadow-lg shadow-orange-900/20">
                  <Image src="/logo-ppdt.png" alt="Logo PPDT" fill sizes="56px" className="object-contain p-1" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl">PPDT</h3>
                  <p className="text-xs text-orange-100">Persatuan Pemuda Dukuh Tengah</p>
                </div>
              </div>
              <p className="text-sm text-orange-100 leading-relaxed">
                Wadah pemersatu pemuda Dukuh Tengah dalam membangun lingkungan yang guyub, kreatif, dan berdaya.
              </p>
            </div>

            <div>
              <h4 className="font-display font-semibold mb-4 text-base">Navigasi</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/" className="text-orange-100 hover:text-white transition hover:translate-x-1 inline-block">Beranda</Link></li>
                <li><Link href="/tentang" className="text-orange-100 hover:text-white transition hover:translate-x-1 inline-block">Tentang Kami</Link></li>
                <li><Link href="/kegiatan" className="text-orange-100 hover:text-white transition hover:translate-x-1 inline-block">Kegiatan</Link></li>
                <li><Link href="/galeri" className="text-orange-100 hover:text-white transition hover:translate-x-1 inline-block">Galeri</Link></li>
                <li><Link href="/keuangan" className="text-orange-100 hover:text-white transition hover:translate-x-1 inline-block">Laporan Keuangan</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-semibold mb-4 text-base">Kontak</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-orange-200" />
                  <span className="text-orange-100">Dk Tengah - Tamansari - Jatinegara, Kab. Tegal</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 flex-shrink-0 text-orange-200" />
                  <a href="mailto:offical.ppdt@gmail.com" className="text-orange-100 hover:text-white transition">offical.ppdt@gmail.com</a>
                </li>
              </ul>

              <div className="flex gap-3 mt-5">
                <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white hover:text-orange-600 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-1">
                  <InstagramIcon className="h-4 w-4" />
                </a>
                <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white hover:text-orange-600 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-1">
                  <FacebookIcon className="h-4 w-4" />
                </a>
                <a href="#" aria-label="WhatsApp" className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white hover:text-orange-600 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-1">
                  <WhatsAppIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 mt-12 pt-6 text-center text-sm text-orange-100">
            <p>&copy; {tahunIni} <span className="font-semibold">Persatuan Pemuda Dukuh Tengah</span></p>
          </div>
        </div>
      </div>
    </footer>
  )
}