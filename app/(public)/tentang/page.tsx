import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Target, Eye, Heart, Users, Mail, Phone, MapPin, Sparkles } from 'lucide-react'
import { dummyPengaturan } from '@/lib/dummy-data'

const pengurus = [
  { nama: 'Ahmad Hidayat', jabatan: 'Ketua', initial: 'AH', color: 'from-red-500 to-orange-500' },
  { nama: 'Siti Aminah', jabatan: 'Wakil Ketua', initial: 'SA', color: 'from-orange-500 to-amber-500' },
  { nama: 'Budi Santoso', jabatan: 'Sekretaris', initial: 'BS', color: 'from-amber-500 to-yellow-500' },
  { nama: 'Dewi Lestari', jabatan: 'Bendahara', initial: 'DL', color: 'from-red-600 to-pink-500' },
  { nama: 'Eko Prasetyo', jabatan: 'Koord. Acara', initial: 'EP', color: 'from-orange-600 to-red-500' },
  { nama: 'Fatimah Zahra', jabatan: 'Koord. Humas', initial: 'FZ', color: 'from-amber-600 to-orange-500' },
]

const nilaiOrganisasi = [
  { icon: Heart, judul: 'Gotong Royong', deskripsi: 'Mengedepankan kerjasama dan kebersamaan dalam setiap kegiatan.' },
  { icon: Users, judul: 'Inklusif', deskripsi: 'Terbuka untuk semua pemuda tanpa membedakan latar belakang.' },
  { icon: Target, judul: 'Berdaya', deskripsi: 'Mengembangkan potensi pemuda untuk berkontribusi nyata.' },
]

export default function TentangPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-mesh-sunset py-20 md:py-28 -mt-16 md:-mt-20 pt-32 md:pt-40 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ animationDelay: '3s' }} />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md border border-orange-200 rounded-full px-4 py-1.5 mb-6 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-orange-600" />
              <span className="text-xs font-semibold text-stone-700">Tentang Kami</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-extrabold mb-6 leading-tight">
              Mengenal <span className="text-gradient-sunset">PPDT</span>
            </h1>
            <p className="text-base md:text-lg text-stone-600 leading-relaxed">
              {dummyPengaturan.deskripsi}
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 md:h-16 fill-white" preserveAspectRatio="none" viewBox="0 0 1440 100">
            <path d="M0,50 C240,100 480,0 720,50 C960,100 1200,0 1440,50 L1440,100 L0,100 Z" />
          </svg>
        </div>
      </section>

      {/* VISI MISI */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <Card className="group hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-300 hover:-translate-y-1 border-0 overflow-hidden bg-white">
            <CardContent className="p-8 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500 to-red-600 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition" />
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-5 shadow-lg shadow-red-500/30 group-hover:scale-110 transition">
                <Eye className="h-7 w-7 text-white" />
              </div>
              <h2 className="text-2xl font-display font-bold mb-3 text-stone-900">Visi</h2>
              <p className="text-stone-600 leading-relaxed">
                Menjadi organisasi kepemudaan yang inspiratif dan berdaya, berperan aktif dalam membangun Dukuh Tengah yang harmonis, mandiri, dan berkemajuan.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 hover:-translate-y-1 border-0 overflow-hidden bg-white">
            <CardContent className="p-8 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition" />
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mb-5 shadow-lg shadow-orange-500/30 group-hover:scale-110 transition">
                <Target className="h-7 w-7 text-white" />
              </div>
              <h2 className="text-2xl font-display font-bold mb-3 text-stone-900">Misi</h2>
              <ul className="text-stone-600 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2"><span className="text-orange-500 mt-1">▸</span><span>Mempererat tali silaturahmi antar pemuda</span></li>
                <li className="flex items-start gap-2"><span className="text-orange-500 mt-1">▸</span><span>Menyelenggarakan kegiatan sosial dan budaya</span></li>
                <li className="flex items-start gap-2"><span className="text-orange-500 mt-1">▸</span><span>Mengembangkan potensi keterampilan anggota</span></li>
                <li className="flex items-start gap-2"><span className="text-orange-500 mt-1">▸</span><span>Menjaga lingkungan dan kearifan lokal</span></li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* NILAI-NILAI */}
      <section className="bg-orange-50/50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-orange-100 text-orange-700 hover:bg-orange-100 border-0 px-3 py-1 text-xs font-semibold">
              💎 Nilai Kami
            </Badge>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-stone-900">
              Yang Kami <span className="text-gradient-sunset">Junjung</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {nilaiOrganisasi.map((nilai, idx) => {
              const Icon = nilai.icon
              const gradients = ['from-red-500 to-pink-500', 'from-orange-500 to-amber-500', 'from-amber-500 to-yellow-500']
              return (
                <Card key={nilai.judul} className="group text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white overflow-hidden">
                  <CardContent className="p-8 relative">
                    <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${gradients[idx]} flex items-center justify-center mx-auto mb-5 shadow-xl shadow-orange-500/30 group-hover:scale-110 group-hover:rotate-3 transition`}>
                      <Icon className="h-9 w-9 text-white" />
                    </div>
                    <h3 className="font-display font-bold text-xl mb-2 text-stone-900">{nilai.judul}</h3>
                    <p className="text-stone-600 text-sm leading-relaxed">{nilai.deskripsi}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* SEJARAH */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-orange-100 text-orange-700 hover:bg-orange-100 border-0 px-3 py-1 text-xs font-semibold">
              📖 Sejarah
            </Badge>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-stone-900">
              Perjalanan <span className="text-gradient-sunset">PPDT</span>
            </h2>
          </div>

          <Card className="border-0 shadow-xl shadow-orange-500/10 overflow-hidden bg-white">
            <CardContent className="p-8 md:p-10 relative">
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-red-500 via-orange-500 to-amber-500" />
              <div className="space-y-4 text-stone-700 leading-relaxed">
                <p>
                  Persatuan Pemuda Dukuh Tengah (PPDT) didirikan oleh sekelompok pemuda yang memiliki kepedulian tinggi terhadap perkembangan lingkungan dan kemajuan generasi muda di Dukuh Tengah.
                </p>
                <p>
                  Berawal dari kegiatan kerja bakti rutin dan diskusi-diskusi kecil, organisasi ini terus berkembang hingga menjadi wadah resmi yang menaungi berbagai kegiatan sosial, budaya, olahraga, hingga keuangan komunitas seperti arisan rutin.
                </p>
                <p>
                  Hingga saat ini, PPDT terus berkomitmen untuk menjadi mitra pembangunan masyarakat dengan menjunjung tinggi nilai gotong royong, inklusivitas, dan pemberdayaan pemuda.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* PENGURUS */}
      <section className="bg-orange-50/50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-orange-100 text-orange-700 hover:bg-orange-100 border-0 px-3 py-1 text-xs font-semibold">
              👥 Struktur Organisasi
            </Badge>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-stone-900">
              Pengurus <span className="text-gradient-sunset">PPDT</span>
            </h2>
            <p className="text-stone-600 mt-2 text-lg">Periode 2025-2027</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {pengurus.map((p) => (
              <Card key={p.nama} className="group text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white">
                <CardContent className="p-6">
                  <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${p.color} flex items-center justify-center mx-auto mb-3 text-white font-display font-bold text-2xl shadow-lg shadow-orange-500/30 group-hover:scale-110 group-hover:rotate-6 transition`}>
                    {p.initial}
                  </div>
                  <h3 className="font-display font-bold text-base mb-1 text-stone-900">{p.nama}</h3>
                  <p className="text-sm text-orange-600 font-semibold">{p.jabatan}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* KONTAK */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-orange-100 text-orange-700 hover:bg-orange-100 border-0 px-3 py-1 text-xs font-semibold">
              📬 Hubungi Kami
            </Badge>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-stone-900">
              Mari <span className="text-gradient-sunset">Berkomunikasi</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="group text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white">
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/30 group-hover:scale-110 transition">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-display font-semibold mb-1 text-stone-900">Alamat</h3>
                <p className="text-sm text-stone-600">{dummyPengaturan.alamat}</p>
              </CardContent>
            </Card>

            <Card className="group text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white">
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/30 group-hover:scale-110 transition">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-display font-semibold mb-1 text-stone-900">Email</h3>
                <a href={`mailto:${dummyPengaturan.email}`} className="text-sm text-orange-600 hover:underline break-all font-medium">
                  {dummyPengaturan.email}
                </a>
              </CardContent>
            </Card>

            <Card className="group text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white">
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/30 group-hover:scale-110 transition">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-display font-semibold mb-1 text-stone-900">Telepon</h3>
                <p className="text-sm text-stone-600 font-medium">{dummyPengaturan.telepon}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}