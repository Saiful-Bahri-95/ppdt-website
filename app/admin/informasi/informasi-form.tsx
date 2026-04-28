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
import type { InformasiBulanan } from '@/lib/types/database'

const TAHUN_NOW = new Date().getFullYear()
const BULAN_NOW = new Date().getMonth() + 1
const TAHUN_OPTIONS = Array.from({ length: 5 }, (_, i) => TAHUN_NOW - 2 + i)
const BULAN_OPTIONS = Array.from({ length: 12 }, (_, i) => i + 1)

export function InformasiForm({ informasi }: { informasi?: InformasiBulanan }) {
  const router = useRouter()
  const isEdit = !!informasi
  const [loading, setLoading] = useState(false)

  const [judul, setJudul] = useState(informasi?.judul || '')
  const [isi, setIsi] = useState(informasi?.isi || '')
  const [bulan, setBulan] = useState<number>(informasi?.bulan || BULAN_NOW)
  const [tahun, setTahun] = useState<number>(informasi?.tahun || TAHUN_NOW)
  const [status, setStatus] = useState<'draft' | 'published'>(informasi?.status || 'published')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()
    const payload = {
      judul: judul.trim(),
      isi: isi.trim(),
      bulan,
      tahun,
      status,
      published_at: status === 'published' ? new Date().toISOString() : null,
    }

    if (isEdit) {
      const { error } = await supabase.from('informasi_bulanan').update(payload).eq('id', informasi!.id)
      if (error) {
        toast.error('Gagal update', { description: error.message })
        setLoading(false)
        return
      }
      toast.success('Pengumuman diperbarui')
    } else {
      const { error } = await supabase.from('informasi_bulanan').insert(payload)
      if (error) {
        toast.error('Gagal menambah', { description: error.message })
        setLoading(false)
        return
      }
      toast.success('Pengumuman ditambahkan')
    }

    router.push('/admin/informasi')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-0 bg-white">
        <CardContent className="p-6 md:p-8 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="judul" className="font-semibold">
              Judul Pengumuman <span className="text-red-500">*</span>
            </Label>
            <Input
              id="judul"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              required
              placeholder="Contoh: Iuran Bulan April 2026"
              className="h-11"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-semibold">Bulan</Label>
              <Select value={String(bulan)} onValueChange={(v) => setBulan(Number(v))}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BULAN_OPTIONS.map((b) => (
                    <SelectItem key={b} value={String(b)}>{getNamaBulan(b)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-semibold">Tahun</Label>
              <Select value={String(tahun)} onValueChange={(v) => setTahun(Number(v))}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TAHUN_OPTIONS.map((t) => (
                    <SelectItem key={t} value={String(t)}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="isi" className="font-semibold">
              Isi Pengumuman <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="isi"
              value={isi}
              onChange={(e) => setIsi(e.target.value)}
              required
              placeholder="Tulis isi pengumuman lengkap..."
              rows={10}
            />
            <p className="text-xs text-stone-500">Tip: Tekan Enter untuk pindah baris baru</p>
          </div>

          <div className="space-y-2">
            <Label className="font-semibold">Status</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as 'draft' | 'published')}>
              <SelectTrigger className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="published">📢 Published (Tampil di website)</SelectItem>
                <SelectItem value="draft">📝 Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white shadow-lg shadow-orange-500/30 rounded-full h-11 px-8"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                isEdit ? 'Update Pengumuman' : 'Simpan Pengumuman'
              )}
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