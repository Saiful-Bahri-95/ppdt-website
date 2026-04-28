'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { uploadFile, validateImageFile } from '@/lib/storage'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2, Upload, X, ImageIcon } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'
import { formatTanggalSingkat } from '@/lib/format'

interface KegiatanOption {
  id: string
  judul: string
  tanggal_kegiatan: string
}

interface FilePreview {
  file: File
  preview: string
  caption: string
}

export function GaleriUploadForm({ kegiatanList }: { kegiatanList: KegiatanOption[] }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState<FilePreview[]>([])
  const [kegiatanId, setKegiatanId] = useState<string>('')

  function handleFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newFiles = Array.from(e.target.files || [])
    if (newFiles.length === 0) return

    // Validate all files
    for (const file of newFiles) {
      const error = validateImageFile(file)
      if (error) {
        toast.error(`${file.name}: ${error}`)
        return
      }
    }

    // Add to preview
    const previews: FilePreview[] = newFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      caption: '',
    }))
    setFiles((prev) => [...prev, ...previews])
    e.target.value = '' // Reset input
  }

  function removeFile(index: number) {
    setFiles((prev) => {
      URL.revokeObjectURL(prev[index].preview)
      return prev.filter((_, i) => i !== index)
    })
  }

  function updateCaption(index: number, caption: string) {
    setFiles((prev) => prev.map((f, i) => (i === index ? { ...f, caption } : f)))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (files.length === 0) {
      toast.error('Pilih setidaknya 1 foto')
      return
    }

    setLoading(true)
    const supabase = createClient()
    let success = 0
    let failed = 0

    for (const fp of files) {
      try {
        const url = await uploadFile(fp.file, 'galeri')
        const { error } = await supabase.from('galeri_foto').insert({
          foto_url: url,
          caption: fp.caption.trim() || null,
          kegiatan_id: kegiatanId || null,
          urutan: 0,
        })
        if (error) throw error
        success++
      } catch (err) {
        failed++
        console.error(err)
      }
    }

    setLoading(false)

    if (success > 0) {
      toast.success(`${success} foto berhasil diupload${failed > 0 ? `, ${failed} gagal` : ''}`)
      router.push('/admin/galeri')
      router.refresh()
    } else {
      toast.error('Semua upload gagal')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-0 bg-white">
        <CardContent className="p-6 md:p-8 space-y-5">
          {/* Pilih Kegiatan */}
          <div className="space-y-2">
            <Label className="font-semibold">
              Asosiasikan ke Kegiatan <span className="text-stone-400 text-xs font-normal">(opsional)</span>
            </Label>
            <Select value={kegiatanId || 'none'} onValueChange={(v) => setKegiatanId(v === 'none' ? '' : v)}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Pilih kegiatan..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">— Tidak terkait kegiatan —</SelectItem>
                {kegiatanList.map((k) => (
                  <SelectItem key={k.id} value={k.id}>
                    {k.judul} ({formatTanggalSingkat(k.tanggal_kegiatan)})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Upload Area */}
          <div className="space-y-2">
            <Label className="font-semibold">Pilih Foto-Foto</Label>
            <label className="flex flex-col items-center justify-center w-full py-10 bg-orange-50 border-2 border-dashed border-orange-300 rounded-2xl cursor-pointer hover:bg-orange-100 transition">
              <Upload className="h-10 w-10 text-orange-500 mb-3" />
              <span className="text-sm font-semibold text-stone-700">Klik untuk pilih foto</span>
              <span className="text-xs text-stone-500 mt-1">Bisa pilih banyak foto sekaligus (Ctrl+Click)</span>
              <span className="text-xs text-stone-500">JPG, PNG, atau WebP (maks. 5MB per foto)</span>
              <input type="file" accept="image/*" multiple className="hidden" onChange={handleFilesChange} />
            </label>
          </div>

          {/* Preview */}
          {files.length > 0 && (
            <div className="space-y-3">
              <Label className="font-semibold">Preview ({files.length} foto)</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {files.map((fp, idx) => (
                  <div key={idx} className="bg-stone-50 rounded-2xl p-3 space-y-2">
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-stone-200">
                      <Image src={fp.preview} alt={`Preview ${idx + 1}`} fill sizes="50vw" className="object-cover" />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-7 w-7"
                        onClick={() => removeFile(idx)}
                      >
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <input
                      type="text"
                      placeholder="Caption (opsional)"
                      value={fp.caption}
                      onChange={(e) => updateCaption(idx, e.target.value)}
                      maxLength={300}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="submit"
              disabled={loading || files.length === 0}
              className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white shadow-lg shadow-orange-500/30 rounded-full h-11 px-8"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mengupload {files.length} foto...
                </>
              ) : (
                <>
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Upload {files.length} Foto
                </>
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