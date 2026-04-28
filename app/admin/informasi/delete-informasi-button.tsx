'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { DeleteButton } from '@/components/admin/delete-button'
import { toast } from 'sonner'

export function DeleteInformasiButton({ id, judul }: { id: string; judul: string }) {
  const router = useRouter()

  async function handleDelete() {
    const supabase = createClient()
    const { error } = await supabase.from('informasi_bulanan').delete().eq('id', id)

    if (error) {
      toast.error('Gagal menghapus', { description: error.message })
      return
    }
    toast.success('Pengumuman dihapus')
    router.refresh()
  }

  return <DeleteButton itemName={`pengumuman "${judul}"`} onDelete={handleDelete} />
}