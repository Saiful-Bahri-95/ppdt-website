'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import type { PengaturanOrganisasi } from '@/lib/types/database'

export function PengaturanForm({ pengaturan }: { pengaturan: PengaturanOrganisasi }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [namaOrg, setNamaOrg] = useState(pengaturan?.nama_organisasi || '')
  const [singkatan, setSingkatan] = useState(pengaturan?.singkatan || '')
  const [deskripsi, setDeskripsi] = useState(pengaturan?.deskripsi || '')
  const [alamat, setAlamat] = useState(pengaturan?.alamat || '')
  const [email, setEmail] = useState(pengaturan?.email || '')
  const [telepon, setTelepon] = useState(pengaturan?.telepon || '')
  const [instagram, setInstagram] = useState(pengaturan?.instagram || '')
  const [facebook, setFacebook] = useState(pengaturan?.facebook || '')
  const [whatsapp, setWhatsapp] = useState(pengaturan?.whatsapp || '')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.from('pengaturan_organisasi').update({
      nama_organisasi: namaOrg.trim(),
      singkatan: singkatan.trim(),
      deskripsi: deskripsi.trim() || null,
      alamat: alamat.trim() || null,
      email: email.trim() || null,
      telepon: telepon.trim() || null,
      instagram: instagram.trim() || null,
      facebook: facebook.trim() || null,
      whatsapp: whatsapp.trim() || null,
    }).eq('id', 1)

    if (error) {
      toast.error('Gagal update', { description: error.message })
      setLoading(false)
      return
    }
    toast.success('Pengaturan berhasil disimpan')
    setLoading(false)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-0 bg-white">
        <CardContent className="p-6 md:p-8 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="nama-org" className="font-semibold">
                Nama Organisasi <span className="text-red-500">*</span>
              </Label>
              <Input id="nama-org" value={namaOrg} onChange={(e) => setNamaOrg(e.target.value)} required className="h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="singkatan" className="font-semibold">
                Singkatan <span className="text-red-500">*</span>
              </Label>
              <Input id="singkatan" value={singkatan} onChange={(e) => setSingkatan(e.target.value)} required className="h-11" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="deskripsi" className="font-semibold">Deskripsi Organisasi</Label>
            <Textarea id="deskripsi" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} rows={4} placeholder="Tentang organisasi..." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="alamat" className="font-semibold">Alamat</Label>
            <Input id="alamat" value={alamat} onChange={(e) => setAlamat(e.target.value)} className="h-11" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-semibold">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telepon" className="font-semibold">Telepon</Label>
              <Input id="telepon" value={telepon} onChange={(e) => setTelepon(e.target.value)} placeholder="+62 812..." className="h-11" />
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100">
            <h3 className="font-display font-semibold mb-4">Media Sosial</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="instagram" className="font-semibold text-sm">Instagram</Label>
                <Input id="instagram" value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="@ppdt" className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facebook" className="font-semibold text-sm">Facebook</Label>
                <Input id="facebook" value={facebook} onChange={(e) => setFacebook(e.target.value)} placeholder="PPDT Page" className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp" className="font-semibold text-sm">WhatsApp</Label>
                <Input id="whatsapp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="+62812..." className="h-11" />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white shadow-lg shadow-orange-500/30 rounded-full h-11 px-8"
            >
              {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Menyimpan...</> : 'Simpan Pengaturan'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}