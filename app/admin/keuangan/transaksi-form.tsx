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
import type { TransaksiKeuangan, TransactionType } from '@/lib/types/database'

const KATEGORI_PEMASUKAN = ['Iuran Anggota', 'Donasi', 'Hibah', 'Hasil Usaha', 'Lainnya']
const KATEGORI_PENGELUARAN = ['Konsumsi', 'Acara', 'Pelatihan', 'Operasional', 'Sosial', 'Lainnya']

export function TransaksiForm({ transaksi }: { transaksi?: TransaksiKeuangan }) {
  const router = useRouter()
  const isEdit = !!transaksi
  const [loading, setLoading] = useState(false)

  const [tanggal, setTanggal] = useState(transaksi?.tanggal || new Date().toISOString().split('T')[0])
  const [jenis, setJenis] = useState<TransactionType>(transaksi?.jenis || 'pemasukan')
  const [kategori, setKategori] = useState(transaksi?.kategori || 'Iuran Anggota')
  const [nominal, setNominal] = useState<string>(transaksi?.nominal?.toString() || '')
  const [keterangan, setKeterangan] = useState(transaksi?.keterangan || '')

  // Saat ganti jenis, reset kategori ke yang valid
  function handleJenisChange(newJenis: TransactionType) {
    setJenis(newJenis)
    const validKategori = newJenis === 'pemasukan' ? KATEGORI_PEMASUKAN : KATEGORI_PENGELUARAN
    if (!validKategori.includes(kategori)) {
      setKategori(validKategori[0])
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!nominal || Number(nominal) <= 0) {
      toast.error('Nominal harus lebih dari 0')
      return
    }
    setLoading(true)

    const supabase = createClient()
    const payload = {
      tanggal,
      jenis,
      kategori,
      nominal: Number(nominal),
      keterangan: keterangan.trim() || null,
    }

    if (isEdit) {
      const { error } = await supabase.from('transaksi_keuangan').update(payload).eq('id', transaksi!.id)
      if (error) {
        toast.error('Gagal update', { description: error.message })
        setLoading(false)
        return
      }
      toast.success('Transaksi diperbarui')
    } else {
      const { error } = await supabase.from('transaksi_keuangan').insert(payload)
      if (error) {
        toast.error('Gagal menambah', { description: error.message })
        setLoading(false)
        return
      }
      toast.success('Transaksi ditambahkan')
    }

    router.push('/admin/keuangan')
    router.refresh()
  }

  const kategoriOptions = jenis === 'pemasukan' ? KATEGORI_PEMASUKAN : KATEGORI_PENGELUARAN

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-0 bg-white">
        <CardContent className="p-6 md:p-8 space-y-5">
          <div className="space-y-2">
            <Label className="font-semibold">
              Jenis Transaksi <span className="text-red-500">*</span>
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleJenisChange('pemasukan')}
                className={`p-4 rounded-2xl border-2 font-semibold transition ${
                  jenis === 'pemasukan'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-stone-200 text-stone-500 hover:border-stone-300'
                }`}
              >
                ⬆️ Pemasukan
              </button>
              <button
                type="button"
                onClick={() => handleJenisChange('pengeluaran')}
                className={`p-4 rounded-2xl border-2 font-semibold transition ${
                  jenis === 'pengeluaran'
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-stone-200 text-stone-500 hover:border-stone-300'
                }`}
              >
                ⬇️ Pengeluaran
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tanggal" className="font-semibold">
                Tanggal <span className="text-red-500">*</span>
              </Label>
              <Input id="tanggal" type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} required className="h-11" />
            </div>
            <div className="space-y-2">
              <Label className="font-semibold">
                Kategori <span className="text-red-500">*</span>
              </Label>
              <Select value={kategori} onValueChange={setKategori}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {kategoriOptions.map((k) => (
                    <SelectItem key={k} value={k}>{k}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nominal" className="font-semibold">
              Nominal (Rp) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="nominal"
              type="number"
              min={1}
              value={nominal}
              onChange={(e) => setNominal(e.target.value)}
              required
              placeholder="500000"
              className="h-11"
            />
            <p className="text-xs text-stone-500">Tulis tanpa titik atau koma. Contoh: 500000 untuk 500 ribu.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="keterangan" className="font-semibold">Keterangan</Label>
            <Textarea
              id="keterangan"
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              placeholder="Detail transaksi..."
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
            <Button type="button" variant="outline" disabled={loading} onClick={() => router.push('/admin/keuangan')} className="rounded-full h-11">
              Batal
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}