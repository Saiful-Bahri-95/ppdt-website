import { LoginForm } from '../login/login-form'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'Login Admin',
}

export default async function LoginPage() {
  // Kalau sudah login, redirect ke dashboard
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/admin')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-mesh-sunset px-4 py-12 -mt-16 md:-mt-20 pt-32 md:pt-40">
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" style={{ animationDelay: '3s' }} />
      </div>

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="relative w-20 h-20 mx-auto mb-4 animate-float">
            <Image src="/logo-ppdt.png" alt="Logo PPDT" fill className="object-contain drop-shadow-xl" priority />
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-extrabold text-stone-900 mb-2">
            Panel <span className="text-gradient-sunset">Admin</span>
          </h1>
          <p className="text-sm text-stone-600">Masuk untuk mengelola konten PPDT</p>
        </div>

        <LoginForm />
      </div>
    </div>
  )
}