'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { getNamaBulan } from '@/lib/format'
import type { InformasiBulanan, ContentStatus } from '@/lib/types/database'

interface InformasiFormProps {
  informasi?: InformasiBulanan
}

const BULAN_OPTIONS = Array.from({ length: 12 }, (_, i) => ({
  value: String(i + 1),
  label: getNamaBulan(i + 1),
}))

export function InformasiForm({ informasi }: InformasiFormProps) {
  const router = useRouter()
  const isEdit = !!informasi
  const [loading, setLoading] = useState(false)

  const now = new Date()
  const [judul, setJudul] = useState(informasi?.judul || '')
  const [bulan, setBulan] = useState<string>(String(informasi?.bulan || now.getMonth() + 1))
  const [tahun, setTahun] = useState<string>(String(informasi?.tahun || now.getFullYear()))
  const [isi, setIsi] = useState(informasi?.isi || '')
  const [status, setStatus] = useState<ContentStatus>(informasi?.status || 'draft')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()
    const payload = {
      judul: judul.trim(),
      bulan: Number(bulan),
      tahun: Number(tahun),
      isi: isi.trim(),
      status,
      published_at: status === 'published' && !informasi?.published_at ? new Date().toISOString() : informasi?.published_at,
    }

    if (isEdit) {
      const { error } = await supabase.from('informasi_bulanan').update(payload).eq('id', informasi!.id)
      if (error) {
        toast.error('Gagal update', { description: error.message })
        setLoading(false)
        return
      }
      toast.success('Informasi diperbarui')
    } else {
      const { error } = await supabase.from('informasi_bulanan').insert(payload)
      if (error) {
        toast.error('Gagal menambah', { description: error.message })
        setLoading(false)
        return
      }
      toast.success('Informasi ditambahkan')
    }

    router.push('/admin/informasi')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-0 bg-stone-900">
        <CardContent className="p-6 md:p-8 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="judul" className="font-semibold text-stone-200">
              Judul Pengumuman <span className="text-red-400">*</span>
            </Label>
            <Input
              id="judul"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              required
              placeholder="Contoh: Pengumuman Iuran Bulan Februari"
              className="h-11 bg-stone-950 border-stone-800 text-stone-100 placeholder:text-stone-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-semibold text-stone-200">
                Bulan <span className="text-red-400">*</span>
              </Label>
              <Select value={bulan} onValueChange={setBulan}>
                <SelectTrigger className="h-11 bg-stone-950 border-stone-800 text-stone-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BULAN_OPTIONS.map((b) => (
                    <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tahun" className="font-semibold text-stone-200">
                Tahun <span className="text-red-400">*</span>
              </Label>
              <Input
                id="tahun"
                type="number"
                min={2020}
                max={2100}
                value={tahun}
                onChange={(e) => setTahun(e.target.value)}
                required
                className="h-11 bg-stone-950 border-stone-800 text-stone-100"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="isi" className="font-semibold text-stone-200">
              Isi Pengumuman <span className="text-red-400">*</span>
            </Label>
            <Textarea
              id="isi"
              value={isi}
              onChange={(e) => setIsi(e.target.value)}
              required
              rows={10}
              placeholder="Tulis isi pengumuman di sini..."
              className="bg-stone-950 border-stone-800 text-stone-100 placeholder:text-stone-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-semibold text-stone-200">Status Publikasi</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as ContentStatus)}>
              <SelectTrigger className="h-11 bg-stone-950 border-stone-800 text-stone-100">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">📝 Draft</SelectItem>
                <SelectItem value="published">🚀 Published</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white shadow-lg shadow-orange-500/30 rounded-full h-11 px-8"
            >
              {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Menyimpan...</> : isEdit ? 'Update' : 'Simpan'}
            </Button>
            <Button type="button" variant="outline" disabled={loading} onClick={() => router.push('/admin/informasi')} className="rounded-full h-11">
              Batal
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}