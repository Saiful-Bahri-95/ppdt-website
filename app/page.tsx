import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6">
          <Image
            src="/logo-ppdt.png"
            alt="Logo PPDT"
            fill
            className="object-contain"
            priority
          />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-700 to-orange-600 bg-clip-text text-transparent">
          Selamat Datang di PPDT
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Persatuan Pemuda Dukuh Tengah
        </p>
        <p className="text-base text-gray-500">
          Halaman ini sedang dalam pengembangan. Sampai jumpa segera dengan tampilan yang lebih lengkap! 🚀
        </p>
      </div>
    </div>
  )
}

// import { createClient } from '@/lib/supabase/server'

// export default async function HomePage() {
//   const supabase = await createClient()

//   // Test query: ambil pengaturan organisasi
//   const { data, error } = await supabase
//     .from('pengaturan_organisasi')
//     .select('*')
//     .single()

//   return (
//     <div className="p-8 font-mono">
//       <h1 className="text-2xl font-bold mb-4">🧪 Test Koneksi Supabase</h1>

//       {error ? (
//         <div className="bg-red-100 border border-red-400 p-4 rounded">
//           <p className="text-red-800 font-bold">❌ Error:</p>
//           <pre className="text-sm mt-2">{JSON.stringify(error, null, 2)}</pre>
//         </div>
//       ) : (
//         <div className="bg-green-100 border border-green-400 p-4 rounded">
//           <p className="text-green-800 font-bold">✅ Koneksi Berhasil!</p>
//           <pre className="text-sm mt-2">{JSON.stringify(data, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   )
// }
