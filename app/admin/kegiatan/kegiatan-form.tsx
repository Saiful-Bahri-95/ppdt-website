'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { uploadFile, deleteFileFromUrl, validateImageFile } from '@/lib/storage'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2, Upload, X, Image as ImageIcon } from 'lucide-react'
import { toast } from 'sonner'
import type { Kegiatan } from '@/lib/types/database'

interface KegiatanFormProps {
  kegiatan?: Kegiatan
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function KegiatanForm({ kegiatan }: KegiatanFormProps) {
  const router = useRouter()
  const isEdit = !!kegiatan
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)

  const [judul, setJudul] = useState(kegiatan?.judul || '')
  const [slug, setSlug] = useState(kegiatan?.slug || '')
  const [tanggal, setTanggal] = useState(kegiatan?.tanggal_kegiatan || new Date().toISOString().split('T')[0])
  const [lokasi, setLokasi] = useState(kegiatan?.lokasi || '')
  const [ringkasan, setRingkasan] = useState(kegiatan?.ringkasan || '')
  const [deskripsi, setDeskripsi] = useState(kegiatan?.deskripsi || '')
  const [status, setStatus] = useState<'draft' | 'published'>(kegiatan?.status || 'draft')
  const [fotoUrl, setFotoUrl] = useState<string | null>(kegiatan?.foto_header_url || null)
  const [fotoFile, setFotoFile] = useState<File | null>(null)
  const [fotoPreview, setFotoPreview] = useState<string | null>(kegiatan?.foto_header_url || null)

  function handleJudulChange(value: string) {
    setJudul(value)
    if (!isEdit || !slug) {
      setSlug(generateSlug(value))
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const validationError = validateImageFile(file)
    if (validationError) {
      toast.error(validationError)
      return
    }

    setFotoFile(file)
    setFotoPreview(URL.createObjectURL(file))
  }

  function removeFoto() {
    if (fotoPreview && fotoFile) URL.revokeObjectURL(fotoPreview)
    setFotoFile(null)
    setFotoPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()
    let finalFotoUrl = fotoUrl

    if (fotoFile) {
      const uploadedUrl = await uploadFile(fotoFile, 'kegiatan')
      if (!uploadedUrl) {
        toast.error('Gagal mengupload foto')
        setLoading(false)
        return
      }
      if (isEdit && fotoUrl) await deleteFileFromUrl(fotoUrl)
      finalFotoUrl = uploadedUrl
    }

    const existingPublishedAt = (kegiatan as any)?.published_at ?? null

    const payload = {
      judul: judul.trim(),
      slug: slug.trim() || generateSlug(judul),
      tanggal_kegiatan: tanggal,
      lokasi: lokasi.trim() || null,
      ringkasan: ringkasan.trim() || null,
      deskripsi: deskripsi.trim(),
      status,
      foto_header_url: finalFotoUrl,
      published_at: status === 'published' && !existingPublishedAt ? new Date().toISOString() : existingPublishedAt,
    }

    if (isEdit) {
      const { error } = await supabase.from('kegiatan').update(payload).eq('id', kegiatan!.id)
      if (error) {
        toast.error('Gagal update', { description: error.message })
        setLoading(false)
        return
      }
      toast.success('Kegiatan diperbarui')
    } else {
      const { error } = await supabase.from('kegiatan').insert(payload)
      if (error) {
        toast.error('Gagal menambah', { description: error.message })
        setLoading(false)
        return
      }
      toast.success('Kegiatan ditambahkan')
    }

    router.push('/admin/kegiatan')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-0 bg-stone-900">
        <CardContent className="p-6 md:p-8 space-y-5">
          <div className="space-y-2">
            <Label className="font-semibold text-stone-200">Foto Header Kegiatan</Label>
            {fotoPreview ? (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-stone-950 border border-stone-800">
                <Image src={fotoPreview} alt="Preview" fill sizes="100vw" className="object-cover" />
                <button
                  type="button"
                  onClick={removeFoto}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-orange-900/50 rounded-2xl p-8 text-center cursor-pointer hover:border-orange-500 hover:bg-orange-950/20 transition bg-stone-950/50"
              >
                <Upload className="h-10 w-10 mx-auto text-orange-400 mb-3" />
                <p className="text-sm font-semibold text-stone-100 mb-1">Klik untuk pilih foto</p>
                <p className="text-xs text-stone-500">JPG, PNG, atau WebP (maks. 5MB)</p>
              </div>
            )}
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="judul" className="font-semibold text-stone-200">
              Judul Kegiatan <span className="text-red-400">*</span>
            </Label>
            <Input
              id="judul"
              value={judul}
              onChange={(e) => handleJudulChange(e.target.value)}
              required
              placeholder="Contoh: Lomba 17 Agustus 2025"
              className="h-11 bg-stone-950 border-stone-800 text-stone-100 placeholder:text-stone-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug" className="font-semibold text-stone-200">
              Slug URL <span className="text-stone-500 text-xs font-normal">(otomatis dari judul)</span>
            </Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="lomba-17-agustus-2025"
              className="h-11 bg-stone-950 border-stone-800 text-stone-100 placeholder:text-stone-500 font-mono text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tanggal" className="font-semibold text-stone-200">
                Tanggal Kegiatan <span className="text-red-400">*</span>
              </Label>
              <Input
                id="tanggal"
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                required
                className="h-11 bg-stone-950 border-stone-800 text-stone-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lokasi" className="font-semibold text-stone-200">Lokasi</Label>
              <Input
                id="lokasi"
                value={lokasi}
                onChange={(e) => setLokasi(e.target.value)}
                placeholder="Contoh: Lapangan RT 12"
                className="h-11 bg-stone-950 border-stone-800 text-stone-100 placeholder:text-stone-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ringkasan" className="font-semibold text-stone-200">
              Ringkasan <span className="text-stone-500 text-xs font-normal">(maks. 200 karakter)</span>
            </Label>
            <Textarea
              id="ringkasan"
              value={ringkasan}
              onChange={(e) => setRingkasan(e.target.value)}
              maxLength={200}
              rows={2}
              placeholder="Ringkasan singkat untuk preview..."
              className="bg-stone-950 border-stone-800 text-stone-100 placeholder:text-stone-500"
            />
            <p className="text-xs text-stone-500">{ringkasan.length}/200 karakter</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="deskripsi" className="font-semibold text-stone-200">
              Deskripsi Lengkap <span className="text-red-400">*</span>
            </Label>
            <Textarea
              id="deskripsi"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              required
              rows={8}
              placeholder="Tulis deskripsi lengkap kegiatan di sini..."
              className="bg-stone-950 border-stone-800 text-stone-100 placeholder:text-stone-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-semibold text-stone-200">Status Publikasi</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as 'draft' | 'published')}>
              <SelectTrigger className="h-11 bg-stone-950 border-stone-800 text-stone-100">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">📝 Draft (tidak dipublish)</SelectItem>
                <SelectItem value="published">🚀 Published (tampil di website)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white shadow-lg shadow-orange-500/30 rounded-full h-11 px-8"
            >
              {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Menyimpan...</> : isEdit ? 'Update Kegiatan' : 'Simpan Kegiatan'}
            </Button>
            <Button type="button" variant="outline" disabled={loading} onClick={() => router.push('/admin/kegiatan')} className="rounded-full h-11">
              Batal
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}