import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: {
    default: "PPDT - Persatuan Pemuda Dukuh Tengah",
    template: "%s | PPDT",
  },
  description: "Website resmi Persatuan Pemuda Dukuh Tengah (PPDT) - wadah pemersatu pemuda dalam membangun lingkungan yang guyub dan berdaya.",
  keywords: ["PPDT", "Persatuan Pemuda", "Dukuh Tengah", "Organisasi Pemuda", "Karang Taruna"],
  authors: [{ name: "PPDT" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    title: "PPDT - Persatuan Pemuda Dukuh Tengah",
    description: "Website resmi Persatuan Pemuda Dukuh Tengah",
    siteName: "PPDT",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased bg-gray-50 text-gray-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}