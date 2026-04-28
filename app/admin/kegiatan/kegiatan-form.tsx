'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { uploadFile, deleteFileFromUrl, validateImageFile } from '@/lib/storage'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2, Upload, X } from 'lucide-react'
import { toast } from 'sonner'
import slugify from 'slugify'
import Image from 'next/image'
import type { Kegiatan } from '@/lib/types/database'

interface KegiatanFormProps {
  kegiatan?: Kegiatan
}

export function KegiatanForm({ kegiatan }: KegiatanFormProps) {
  const router = useRouter()
  const isEdit = !!kegiatan

  const [loading, setLoading] = useState(false)
  const [uploadingFoto, setUploadingFoto] = useState(false)

  // Form state
  const [judul, setJudul] = useState(kegiatan?.judul || '')
  const [deskripsi, setDeskripsi] = useState(kegiatan?.deskripsi || '')
  const [ringkasan, setRingkasan] = useState(kegiatan?.ringkasan || '')
  const [tanggal, setTanggal] = useState(kegiatan?.tanggal_kegiatan || new Date().toISOString().split('T')[0])
  const [lokasi, setLokasi] = useState(kegiatan?.lokasi || '')
  const [fotoUrl, setFotoUrl] = useState<string | null>(kegiatan?.foto_header_url || null)
  const [status, setStatus] = useState<'draft' | 'published'>(kegiatan?.status || 'published')

  async function handleFotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const error = validateImageFile(file)
    if (error) {
      toast.error(error)
      return
    }

    setUploadingFoto(true)
    try {
      // Hapus foto lama jika ada
      if (fotoUrl) await deleteFileFromUrl(fotoUrl).catch(() => {})

      const url = await uploadFile(file, 'kegiatan')
      setFotoUrl(url)
      toast.success('Foto berhasil diupload')
    } catch (err) {
      toast.error('Gagal upload foto', { description: err instanceof Error ? err.message : 'Unknown error' })
    } finally {
      setUploadingFoto(false)
    }
  }

  async function handleRemoveFoto() {
    if (!fotoUrl) return
    await deleteFileFromUrl(fotoUrl).catch(() => {})
    setFotoUrl(null)
    toast.success('Foto dihapus')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()
    const slug = slugify(judul, { lower: true, strict: true, locale: 'id' })

    const payload = {
      judul: judul.trim(),
      slug,
      deskripsi: deskripsi.trim(),
      ringkasan: ringkasan.trim() || null,
      tanggal_kegiatan: tanggal,
      lokasi: lokasi.trim() || null,
      foto_header_url: fotoUrl,
      status,
    }

    if (isEdit) {
      const { error } = await supabase
        .from('kegiatan')
        .update(payload)
        .eq('id', kegiatan!.id)

      if (error) {
        toast.error('Gagal update', { description: error.message })
        setLoading(false)
        return
      }
      toast.success('Kegiatan berhasil diperbarui')
    } else {
      const { error } = await supabase.from('kegiatan').insert(payload)
      if (error) {
        toast.error('Gagal menambah', { description: error.message })
        setLoading(false)
        return
      }
      toast.success('Kegiatan berhasil ditambahkan')
    }

    router.push('/admin/kegiatan')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-0 bg-white">
        <CardContent className="p-6 md:p-8 space-y-5">
          {/* Foto Header */}
          <div className="space-y-2">
            <Label className="font-semibold">Foto Header</Label>
            {fotoUrl ? (
              <div className="relative aspect-video w-full max-w-md rounded-2xl overflow-hidden bg-stone-100">
                <Image src={fotoUrl} alt="Foto kegiatan" fill sizes="448px" className="object-cover" />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={handleRemoveFoto}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full max-w-md aspect-video bg-orange-50 border-2 border-dashed border-orange-300 rounded-2xl cursor-pointer hover:bg-orange-100 transition">
                {uploadingFoto ? (
                  <>
                    <Loader2 className="h-8 w-8 text-orange-500 animate-spin mb-2" />
                    <span className="text-sm text-stone-600">Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-orange-500 mb-2" />
                    <span className="text-sm font-semibold text-stone-700">Klik untuk upload foto</span>
                    <span className="text-xs text-stone-500 mt-1">JPG, PNG, atau WebP (maks. 5MB)</span>
                  </>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={handleFotoChange} disabled={uploadingFoto} />
              </label>
            )}
          </div>

          {/* Judul */}
          <div className="space-y-2">
            <Label htmlFor="judul" className="font-semibold">
              Judul Kegiatan <span className="text-red-500">*</span>
            </Label>
            <Input
              id="judul"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              required
              placeholder="Contoh: Bakti Sosial Idul Adha"
              className="h-11"
            />
          </div>

          {/* Tanggal & Lokasi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tanggal" className="font-semibold">
                Tanggal Kegiatan <span className="text-red-500">*</span>
              </Label>
              <Input
                id="tanggal"
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lokasi" className="font-semibold">Lokasi</Label>
              <Input
                id="lokasi"
                value={lokasi}
                onChange={(e) => setLokasi(e.target.value)}
                placeholder="Contoh: Balai Desa Dukuh Tengah"
                className="h-11"
              />
            </div>
          </div>

          {/* Ringkasan */}
          <div className="space-y-2">
            <Label htmlFor="ringkasan" className="font-semibold">
              Ringkasan <span className="text-stone-400 text-xs font-normal">(untuk tampilan card)</span>
            </Label>
            <Textarea
              id="ringkasan"
              value={ringkasan}
              onChange={(e) => setRingkasan(e.target.value)}
              placeholder="Ringkasan singkat 1-2 kalimat"
              rows={2}
              maxLength={300}
            />
            <p className="text-xs text-stone-500">{ringkasan.length}/300 karakter</p>
          </div>

          {/* Deskripsi */}
          <div className="space-y-2">
            <Label htmlFor="deskripsi" className="font-semibold">
              Deskripsi Lengkap <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="deskripsi"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              required
              placeholder="Ceritakan detail kegiatan..."
              rows={8}
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status" className="font-semibold">Status Publikasi</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as 'draft' | 'published')}>
              <SelectTrigger className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="published">📢 Published (Tampil di website)</SelectItem>
                <SelectItem value="draft">📝 Draft (Hanya admin yang bisa lihat)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="submit"
              disabled={loading || uploadingFoto}
              className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white shadow-lg shadow-orange-500/30 rounded-full h-11 px-8"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                isEdit ? 'Update Kegiatan' : 'Simpan Kegiatan'
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              onClick={() => router.push('/admin/kegiatan')}
              className="rounded-full h-11"
            >
              Batal
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}