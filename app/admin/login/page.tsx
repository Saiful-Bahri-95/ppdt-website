import Link from 'next/link'
import Image from 'next/image'
import { LoginForm } from './login-form'

export const metadata = { title: 'Login Admin' }

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-mesh-sunset px-4 py-12 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-orange-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-red-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-amber-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center group">
            <div className="relative w-20 h-20 mb-4 transition-transform group-hover:scale-110 group-hover:rotate-3 duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 rounded-full blur-2xl opacity-40" />
              <Image src="/logo-ppdt.png" alt="Logo PPDT" fill sizes="80px" className="object-contain relative drop-shadow-2xl" priority />
            </div>
            <h1 className="font-display font-extrabold text-3xl text-gradient-sunset">PPDT</h1>
            <p className="text-xs text-stone-400 mt-1">Panel Administrator</p>
          </Link>
        </div>

        <div className="bg-stone-900/95 backdrop-blur-md border border-stone-800 rounded-3xl shadow-2xl shadow-orange-500/10 p-7 md:p-8">
          <div className="text-center mb-6">
            <h2 className="font-display font-bold text-2xl text-stone-50 mb-1">Selamat Datang</h2>
            <p className="text-sm text-stone-400">Masuk untuk mengelola konten PPDT</p>
          </div>

          <LoginForm />
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-stone-400 hover:text-orange-400 transition">
            ← Kembali ke website
          </Link>
        </div>
      </div>
    </div>
  )
}