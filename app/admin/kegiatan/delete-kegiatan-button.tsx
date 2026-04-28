'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { deleteFileFromUrl } from '@/lib/storage'
import { DeleteButton } from '@/components/admin/delete-button'
import { toast } from 'sonner'

interface Props {
  id: string
  judul: string
  fotoUrl: string | null
}

export function DeleteKegiatanButton({ id, judul, fotoUrl }: Props) {
  const router = useRouter()

  async function handleDelete() {
    const supabase = createClient()

    // Hapus foto-foto galeri terkait dari storage
    const { data: galeri } = await supabase
      .from('galeri_foto')
      .select('foto_url')
      .eq('kegiatan_id', id)

    if (galeri) {
      for (const g of galeri) {
        if (g.foto_url) await deleteFileFromUrl(g.foto_url).catch(() => {})
      }
    }

    // Hapus foto header
    if (fotoUrl) await deleteFileFromUrl(fotoUrl).catch(() => {})

    // Hapus kegiatan (galeri akan terhapus otomatis karena CASCADE)
    const { error } = await supabase.from('kegiatan').delete().eq('id', id)

    if (error) {
      toast.error('Gagal menghapus kegiatan', { description: error.message })
      return
    }

    toast.success('Kegiatan berhasil dihapus')
    router.refresh()
  }

  return <DeleteButton itemName={`kegiatan "${judul}"`} onDelete={handleDelete} />
}