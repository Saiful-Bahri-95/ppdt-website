'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { DeleteButton } from '@/components/admin/delete-button'
import { toast } from 'sonner'

export function DeleteTransaksiButton({ id, keterangan }: { id: string; keterangan: string }) {
  const router = useRouter()

  async function handleDelete() {
    const supabase = createClient()
    const { error } = await supabase.from('transaksi_keuangan').delete().eq('id', id)

    if (error) {
      toast.error('Gagal menghapus', { description: error.message })
      return
    }
    toast.success('Transaksi dihapus')
    router.refresh()
  }

  return <DeleteButton itemName={`transaksi "${keterangan}"`} onDelete={handleDelete} />
}