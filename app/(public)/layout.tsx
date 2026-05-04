import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { InstallPrompt } from '@/components/install-prompt'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <InstallPrompt />
    </>
  )
}