'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { deleteFileFromUrl } from '@/lib/storage'
import { Button } from '@/components/ui/button'
import { Loader2, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

interface Props {
  id: string
  fotoUrl: string
}

export function DeleteFotoButton({ id, fotoUrl }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!confirm('Hapus foto ini?')) return
    setLoading(true)

    const supabase = createClient()
    await deleteFileFromUrl(fotoUrl).catch(() => {})
    const { error } = await supabase.from('galeri_foto').delete().eq('id', id)

    if (error) {
      toast.error('Gagal menghapus', { description: error.message })
      setLoading(false)
      return
    }

    toast.success('Foto dihapus')
    router.refresh()
  }

  return (
    <Button
      variant="destructive"
      size="icon"
      className="h-8 w-8 shadow-lg"
      onClick={handleDelete}
      disabled={loading}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
    </Button>
  )
}