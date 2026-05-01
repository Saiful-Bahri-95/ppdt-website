import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Target,
  Eye,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Handshake,
  Heart,
  Building2,
  Vote,
  ShieldCheck,
  Home,
} from 'lucide-react'
import { dummyPengaturan } from '@/lib/dummy-data'

export const metadata = { title: 'Tentang PPDT' }

const pengurus = [
  { nama: 'M Ridwan', jabatan: 'Ketua', initial: 'MR', color: 'from-red-500 to-orange-500' },
  { nama: 'Fulan', jabatan: 'Wakil Ketua', initial: 'FL', color: 'from-orange-500 to-amber-500' },
  { nama: 'Tahroni', jabatan: 'Humas', initial: 'TR', color: 'from-orange-600 to-red-500' },
  { nama: 'Sumarno', jabatan: 'Pembina', initial: 'SM', color: 'from-amber-600 to-orange-500' },
  { nama: 'Haryanto', jabatan: 'Penasehat', initial: 'HA', color: 'from-amber-600 to-orange-500' },
  { nama: 'Warnoto', jabatan: 'Bendahara', initial: 'WN', color: 'from-red-600 to-pink-500' },
  { nama: 'Saiful Bahri', jabatan: 'Sekretaris', initial: 'SB', color: 'from-amber-500 to-yellow-500' },
]

const misiList = [
  'Mempererat tali persaudaraan antar pemuda Dukuh Tengah melalui pertemuan rutin, musyawarah, dan kegiatan kebersamaan.',
  'Memberikan kepedulian sosial kepada anggota dan masyarakat yang membutuhkan, baik dalam suka maupun duka.',
  'Mendukung kegiatan keagamaan dan kemasyarakatan, seperti pengajian, perawatan musholla, serta santunan yatim piatu dan kaum duafa di akhir Ramadhan.',
  'Berkontribusi nyata bagi lingkungan, melalui program seperti pengadaan lampu jalan dan kegiatan kemasyarakatan lainnya di wilayah RT 12, 13, dan 14.',
  'Menumbuhkan semangat kepemudaan melalui kegiatan olahraga, peringatan 17 Agustus, dan beragam aktivitas positif lainnya.',
  'Menjunjung tinggi musyawarah sebagai dasar pengambilan keputusan dalam setiap agenda organisasi.',
]

const nilaiOrganisasi = [
  { icon: Handshake, emoji: '🤝', judul: 'Kebersamaan', deskripsi: 'Kami percaya bahwa kekuatan sejati lahir dari kebersamaan. Setiap anggota adalah bagian dari keluarga besar yang saling mendukung, menguatkan, dan tumbuh bersama.' },
  { icon: Heart, emoji: '❤️', judul: 'Kepedulian Sosial', deskripsi: 'Kami hadir di saat anggota maupun warga masyarakat membutuhkan—baik ketika sakit, mengalami musibah, maupun dalam momen kebahagiaan. Bagi kami, peduli bukan pilihan, melainkan kewajiban.' },
  { icon: Building2, emoji: '🕌', judul: 'Religiusitas', deskripsi: 'Nilai-nilai keagamaan menjadi fondasi setiap langkah PPDT. Melalui pengajian, perawatan musholla, dan santunan kepada yatim piatu serta kaum duafa, kami berupaya menjaga keseimbangan antara hidup duniawi dan ukhrawi.' },
  { icon: Vote, emoji: '🗳️', judul: 'Musyawarah & Demokrasi', deskripsi: 'Setiap suara berharga. Kami menjunjung tinggi musyawarah dan voting sebagai cara mengambil keputusan, memastikan setiap anggota memiliki ruang untuk berpendapat dan berkontribusi.' },
  { icon: ShieldCheck, emoji: '🌟', judul: 'Tanggung Jawab & Disiplin', deskripsi: 'Mulai dari kewajiban iuran arisan dan kas, hingga ketertiban dalam setiap pertemuan, kami menanamkan nilai disiplin dan tanggung jawab sebagai cerminan komitmen kepada organisasi.' },
  { icon: Home, emoji: '🏘️', judul: 'Cinta Lingkungan & Persaudaraan', deskripsi: 'Kami mencintai kampung halaman dan menjadikan persaudaraan sebagai ikatan abadi—tidak hanya bagi yang menetap di Dukuh Tengah, tetapi juga bagi saudara-saudara kami di perantauan.' },
]

const nilaiGradients = [
  'from-red-500 to-pink-500',
  'from-pink-500 to-rose-500',
  'from-orange-500 to-amber-500',
  'from-amber-500 to-yellow-500',
  'from-yellow-500 to-orange-400',
  'from-red-600 to-orange-500',
]

export default function TentangPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-mesh-sunset py-20 md:py-28 -mt-16 md:-mt-20 pt-32 md:pt-40 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-red-400 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-blob" style={{ animationDelay: '3s' }} />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-white/70 dark:bg-stone-900/70 backdrop-blur-md border border-orange-200 dark:border-orange-900/50 rounded-full px-4 py-1.5 mb-6 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-orange-600 dark:text-orange-400" />
              <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">Tentang Kami</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-extrabold mb-6 leading-tight text-stone-900 dark:text-stone-50">
              Mengenal <span className="text-gradient-sunset">PPDT</span>
            </h1>
          </div>

          <div className="max-w-3xl mx-auto space-y-5">
            <Card className="border-0 shadow-xl shadow-orange-500/10 overflow-hidden bg-white/95 dark:bg-stone-900/95 backdrop-blur-sm">
              <CardContent className="p-7 md:p-9 relative">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-red-500 via-orange-500 to-amber-500" />
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-base md:text-lg mb-4">
                  <span className="font-display font-bold text-orange-600 dark:text-orange-400">Persatuan Pemuda Dukuh Tengah (PPDT)</span> adalah wadah perkumpulan pemuda yang lahir dari semangat kebersamaan dan rasa kepedulian terhadap lingkungan masyarakat di wilayah Dukuh Tengah, khususnya <span className="font-semibold text-stone-900 dark:text-stone-100">RT 12, 13, dan 14</span>.
                </p>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-base md:text-lg mb-4">
                  Berlandaskan moto <em className="text-orange-600 dark:text-orange-400 font-semibold">&ldquo;Membangun Kebersamaan, Menjalin Persaudaraan&rdquo;</em>, PPDT hadir sebagai rumah bagi para pemuda untuk bersatu, berkarya, dan memberikan kontribusi nyata bagi kampung halaman.
                </p>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-base md:text-lg">
                  Lebih dari sekadar organisasi, PPDT adalah <span className="font-semibold text-stone-900 dark:text-stone-100">keluarga besar</span> yang menjunjung tinggi nilai gotong royong, solidaritas, dan kepedulian sosial. Melalui berbagai kegiatan rutin seperti arisan bulanan, pengajian, peringatan hari kemerdekaan, kegiatan olahraga, hingga program sosial bagi anak yatim dan kaum duafa, PPDT terus berupaya merawat tradisi, mempererat tali persaudaraan, dan membangun masyarakat yang harmonis.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 md:h-16 fill-white dark:fill-stone-950" preserveAspectRatio="none" viewBox="0 0 1440 100">
            <path d="M0,50 C240,100 480,0 720,50 C960,100 1200,0 1440,50 L1440,100 L0,100 Z" />
          </svg>
        </div>
      </section>

      {/* VISI */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-400 hover:bg-orange-100 border-0 px-3 py-1 text-xs font-semibold">
              🎯 Visi Kami
            </Badge>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-stone-900 dark:text-stone-50">
              Arah <span className="text-gradient-sunset">Tujuan Kami</span>
            </h2>
          </div>

          <Card className="border-0 shadow-2xl shadow-orange-500/15 overflow-hidden bg-white dark:bg-stone-900 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-400 to-orange-500 rounded-full blur-3xl opacity-10" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full blur-3xl opacity-10" />

            <CardContent className="p-8 md:p-12 relative text-center">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-red-500 via-orange-500 to-amber-500 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-500/40">
                <Eye className="h-9 w-9 text-white" />
              </div>
              <p className="text-xl md:text-2xl text-stone-800 dark:text-stone-200 leading-relaxed font-display font-medium italic">
                &ldquo;Mewujudkan pemuda Dukuh Tengah yang <span className="text-gradient-sunset font-bold not-italic">bersatu, peduli, dan berdaya</span> dalam membangun lingkungan masyarakat yang <span className="text-gradient-sunset font-bold not-italic">harmonis, religius, dan sejahtera</span>, berlandaskan semangat kebersamaan dan persaudaraan.&rdquo;
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* MISI */}
      <section className="bg-orange-50/50 dark:bg-orange-950/20 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <Badge className="mb-3 bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-400 hover:bg-orange-100 border-0 px-3 py-1 text-xs font-semibold">
                🚀 Misi Kami
              </Badge>
              <h2 className="text-4xl md:text-5xl font-display font-extrabold text-stone-900 dark:text-stone-50">
                Langkah <span className="text-gradient-sunset">Konkret Kami</span>
              </h2>
              <p className="text-stone-600 dark:text-stone-400 mt-3 text-lg">Enam komitmen untuk mewujudkan visi PPDT</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {misiList.map((misi, idx) => (
                <Card key={idx} className="group border-0 bg-white dark:bg-stone-900 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <CardContent className="p-6 relative">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/30 group-hover:scale-110 group-hover:rotate-3 transition">
                        <span className="text-white font-display font-extrabold text-lg">{idx + 1}</span>
                      </div>
                      <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-sm md:text-base flex-1">
                        {misi}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NILAI */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="text-center mb-12">
          <Badge className="mb-3 bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-400 hover:bg-orange-100 border-0 px-3 py-1 text-xs font-semibold">
            💎 Nilai Kami
          </Badge>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-stone-900 dark:text-stone-50">
            Yang Kami <span className="text-gradient-sunset">Junjung</span>
          </h2>
          <p className="text-stone-600 dark:text-stone-400 mt-3 text-lg max-w-2xl mx-auto">
            Enam pilar nilai yang menjadi pedoman dalam setiap langkah dan keputusan kami
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {nilaiOrganisasi.map((nilai, idx) => {
            const Icon = nilai.icon
            const gradient = nilaiGradients[idx]
            return (
              <Card key={nilai.judul} className="group hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 hover:-translate-y-2 border-0 bg-white dark:bg-stone-900 overflow-hidden relative">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition`} />

                <CardContent className="p-7 relative">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 shadow-xl shadow-orange-500/30 group-hover:scale-110 group-hover:rotate-3 transition`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-2xl mb-1 block leading-none">{nilai.emoji}</span>
                      <h3 className="font-display font-bold text-lg text-stone-900 dark:text-stone-50 leading-tight">{nilai.judul}</h3>
                    </div>
                  </div>
                  <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">{nilai.deskripsi}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* PENGURUS */}
      <section className="bg-orange-50/50 dark:bg-orange-950/20 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-400 hover:bg-orange-100 border-0 px-3 py-1 text-xs font-semibold">
              👥 Struktur Organisasi
            </Badge>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-stone-900 dark:text-stone-50">
              Pengurus <span className="text-gradient-sunset">PPDT</span>
            </h2>
            <p className="text-stone-600 dark:text-stone-400 mt-2 text-lg">Periode 2025-2027</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {pengurus.map((p) => (
              <Card key={p.nama} className="group text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white dark:bg-stone-900">
                <CardContent className="p-6">
                  <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${p.color} flex items-center justify-center mx-auto mb-3 text-white font-display font-bold text-2xl shadow-lg shadow-orange-500/30 group-hover:scale-110 group-hover:rotate-6 transition`}>
                    {p.initial}
                  </div>
                  <h3 className="font-display font-bold text-base mb-1 text-stone-900 dark:text-stone-50">{p.nama}</h3>
                  <p className="text-sm text-orange-600 dark:text-orange-400 font-semibold">{p.jabatan}</p>
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
            <Badge className="mb-3 bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-400 hover:bg-orange-100 border-0 px-3 py-1 text-xs font-semibold">
              📬 Hubungi Kami
            </Badge>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-stone-900 dark:text-stone-50">
              Mari <span className="text-gradient-sunset">Berkomunikasi</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="group text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white dark:bg-stone-900">
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/30 group-hover:scale-110 transition">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-display font-semibold mb-1 text-stone-900 dark:text-stone-50">Alamat</h3>
                <p className="text-sm text-stone-600 dark:text-stone-400">{dummyPengaturan.alamat}</p>
              </CardContent>
            </Card>

            <Card className="group text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white dark:bg-stone-900">
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/30 group-hover:scale-110 transition">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-display font-semibold mb-1 text-stone-900 dark:text-stone-50">Email</h3>
                <a href={`mailto:${dummyPengaturan.email}`} className="text-sm text-orange-600 dark:text-orange-400 hover:underline break-all font-medium">
                  {dummyPengaturan.email}
                </a>
              </CardContent>
            </Card>

            <Card className="group text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white dark:bg-stone-900">
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/30 group-hover:scale-110 transition">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-display font-semibold mb-1 text-stone-900 dark:text-stone-50">Telepon</h3>
                <p className="text-sm text-stone-600 dark:text-stone-400 font-medium">{dummyPengaturan.telepon}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}