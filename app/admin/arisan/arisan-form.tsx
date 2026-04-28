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
import type { PesertaArisan } from '@/lib/types/database'

interface ArisanFormProps {
  peserta?: PesertaArisan
  nextNomor?: number
  lastPeriode?: string
}

export function ArisanForm({ peserta, nextNomor, lastPeriode }: ArisanFormProps) {
  const router = useRouter()
  const isEdit = !!peserta
  const [loading, setLoading] = useState(false)

  const [nama, setNama] = useState(peserta?.nama || '')
  const [nomorUrut, setNomorUrut] = useState<number>(peserta?.nomor_urut || nextNomor || 1)
  const [tanggal, setTanggal] = useState(peserta?.tanggal_keluar || new Date().toISOString().split('T')[0])
  const [periode, setPeriode] = useState(peserta?.periode_arisan || lastPeriode || `Periode ${new Date().getFullYear()}`)
  const [nominal, setNominal] = useState<string>(peserta?.nominal?.toString() || '')
  const [keterangan, setKeterangan] = useState(peserta?.keterangan || '')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()
    const payload = {
      nama: nama.trim(),
      nomor_urut: nomorUrut,
      tanggal_keluar: tanggal,
      periode_arisan: periode.trim(),
      nominal: nominal ? Number(nominal) : null,
      keterangan: keterangan.trim() || null,
    }

    if (isEdit) {
      const { error } = await supabase.from('peserta_arisan').update(payload).eq('id', peserta!.id)
      if (error) {
        toast.error('Gagal update', { description: error.message })
        setLoading(false)
        return
      }
      toast.success('Data pemenang diperbarui')
    } else {
      const { error } = await supabase.from('peserta_arisan').insert(payload)
      if (error) {
        toast.error('Gagal menambah', { description: error.message })
        setLoading(false)
        return
      }
      toast.success('Pemenang arisan ditambahkan')
    }

    router.push('/admin/arisan')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-0 bg-white">
        <CardContent className="p-6 md:p-8 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nomor" className="font-semibold">
                Nomor Urut <span className="text-red-500">*</span>
              </Label>
              <Input
                id="nomor"
                type="number"
                min={1}
                value={nomorUrut}
                onChange={(e) => setNomorUrut(Number(e.target.value))}
                required
                className="h-11"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="nama" className="font-semibold">
                Nama Pemenang <span className="text-red-500">*</span>
              </Label>
              <Input
                id="nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required
                placeholder="Contoh: Budi Santoso"
                className="h-11"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tanggal" className="font-semibold">
                Tanggal Keluar <span className="text-red-500">*</span>
              </Label>
              <Input id="tanggal" type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} required className="h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="periode" className="font-semibold">
                Periode Arisan <span className="text-red-500">*</span>
              </Label>
              <Input
                id="periode"
                value={periode}
                onChange={(e) => setPeriode(e.target.value)}
                required
                placeholder="Periode 2025-2027"
                className="h-11"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nominal" className="font-semibold">
              Nominal Diterima (Rp) <span className="text-stone-400 text-xs font-normal">(opsional)</span>
            </Label>
            <Input
              id="nominal"
              type="number"
              min={0}
              value={nominal}
              onChange={(e) => setNominal(e.target.value)}
              placeholder="5000000"
              className="h-11"
            />
            <p className="text-xs text-stone-500">Tulis tanpa titik atau koma. Contoh: 5000000 untuk 5 juta.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="keterangan" className="font-semibold">Keterangan</Label>
            <Textarea
              id="keterangan"
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              placeholder="Catatan tambahan..."
              rows={3}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white shadow-lg shadow-orange-500/30 rounded-full h-11 px-8"
            >
              {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Menyimpan...</> : isEdit ? 'Update' : 'Simpan'}
            </Button>
            <Button type="button" variant="outline" disabled={loading} onClick={() => router.push('/admin/arisan')} className="rounded-full h-11">
              Batal
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}