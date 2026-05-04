'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { uploadFile, validateImageFile } from '@/lib/storage'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2, Upload, X, ImageIcon } from 'lucide-react'
import { toast } from 'sonner'
import type { Kegiatan } from '@/lib/types/database'

interface FotoUpload {
  file: File
  preview: string
  caption: string
}

interface GaleriUploadFormProps {
  kegiatanList: Kegiatan[]
}

export function GaleriUploadForm({ kegiatanList }: GaleriUploadFormProps) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [kegiatanId, setKegiatanId] = useState<string>('none')
  const [fotos, setFotos] = useState<FotoUpload[]>([])

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files) return

    const newFotos: FotoUpload[] = []
    for (const file of Array.from(files)) {
      const validation = validateImageFile(file)
      if (validation !== null) {
        toast.error(`${file.name}: ${validation}`)
        continue
      }
      newFotos.push({
        file,
        preview: URL.createObjectURL(file),
        caption: '',
      })
    }

    setFotos([...fotos, ...newFotos])
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function removeFoto(idx: number) {
    URL.revokeObjectURL(fotos[idx].preview)
    setFotos(fotos.filter((_, i) => i !== idx))
  }

  function updateCaption(idx: number, caption: string) {
    const updated = [...fotos]
    updated[idx].caption = caption
    setFotos(updated)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (fotos.length === 0) {
      toast.error('Pilih minimal 1 foto')
      return
    }
    setLoading(true)

    const supabase = createClient()
    let success = 0
    let failed = 0

    for (const foto of fotos) {
      const fotoUrl = await uploadFile(foto.file, 'galeri')
      if (!fotoUrl) {
        failed++
        continue
      }

      const { error } = await supabase.from('galeri_foto').insert({
        kegiatan_id: kegiatanId === 'none' ? null : kegiatanId,
        foto_url: fotoUrl,
        caption: foto.caption.trim() || null,
      })

      if (error) failed++
      else success++
    }

    setLoading(false)

    if (success > 0) {
      toast.success(`${success} foto berhasil diupload${failed > 0 ? `, ${failed} gagal` : ''}`)
      router.push('/admin/galeri')
      router.refresh()
    } else {
      toast.error('Semua foto gagal diupload')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-0 bg-stone-900">
        <CardContent className="p-6 md:p-8 space-y-5">
          <div className="space-y-2">
            <Label className="font-semibold text-stone-200">
              Asosiasikan ke Kegiatan <span className="text-stone-500 text-xs font-normal">(opsional)</span>
            </Label>
            <Select value={kegiatanId} onValueChange={setKegiatanId}>
              <SelectTrigger className="h-11 bg-stone-950 border-stone-800 text-stone-100">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">— Tidak terkait kegiatan —</SelectItem>
                {kegiatanList.map((k) => (
                  <SelectItem key={k.id} value={k.id}>{k.judul}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="font-semibold text-stone-200">Pilih Foto-Foto</Label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-orange-900/50 rounded-2xl p-8 text-center cursor-pointer hover:border-orange-500 hover:bg-orange-950/20 transition bg-stone-950/50"
            >
              <Upload className="h-10 w-10 mx-auto text-orange-400 mb-3" />
              <p className="text-sm font-semibold text-stone-100 mb-1">Klik untuk pilih foto</p>
              <p className="text-xs text-stone-400">Bisa pilih banyak foto sekaligus (Ctrl+Click)</p>
              <p className="text-xs text-stone-500 mt-1">JPG, PNG, atau WebP (maks. 5MB per foto)</p>
            </div>
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {fotos.length > 0 && (
            <div className="space-y-2">
              <Label className="font-semibold text-stone-200">Preview ({fotos.length} foto)</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {fotos.map((foto, idx) => (
                  <div key={idx} className="relative bg-stone-950 rounded-2xl overflow-hidden border border-stone-800">
                    <div className="relative aspect-square">
                      <Image src={foto.preview} alt="Preview" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
                      <button
                        type="button"
                        onClick={() => removeFoto(idx)}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg transition"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="p-2">
                      <Input
                        type="text"
                        placeholder="Caption (opsional)"
                        value={foto.caption}
                        onChange={(e) => updateCaption(idx, e.target.value)}
                        className="text-xs h-8 bg-stone-900 border-stone-800 text-stone-100 placeholder:text-stone-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="submit"
              disabled={loading || fotos.length === 0}
              className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white shadow-lg shadow-orange-500/30 rounded-full h-11 px-8"
            >
              {loading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Mengupload...</>
              ) : (
                <><ImageIcon className="mr-2 h-4 w-4" />Upload {fotos.length} Foto</>
              )}
            </Button>
            <Button type="button" variant="outline" disabled={loading} onClick={() => router.push('/admin/galeri')} className="rounded-full h-11">
              Batal
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}