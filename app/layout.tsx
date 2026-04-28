import type { Metadata } from "next"
import { Poppins, DM_Sans } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
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
    <html lang="id" data-scroll-behavior="smooth" className={`${poppins.variable} ${dmSans.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}