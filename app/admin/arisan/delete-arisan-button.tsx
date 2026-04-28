'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Trash2, Loader2, AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'

export function DeleteArisanButton({ id, nama, dark }: { id: string; nama: string; dark?: boolean }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.from('peserta_arisan').delete().eq('id', id)

    if (error) {
      toast.error('Gagal menghapus', { description: error.message })
      setLoading(false)
      return
    }
    toast.success('Pemenang arisan dihapus')
    setOpen(false)
    setLoading(false)
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`h-8 w-8 ${dark ? 'text-white hover:bg-white/20' : 'text-stone-400 hover:text-red-600 hover:bg-red-50'}`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="w-12 h-12 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-2">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <DialogTitle className="text-center">Hapus pemenang &ldquo;{nama}&rdquo;?</DialogTitle>
          <DialogDescription className="text-center">
            Tindakan ini tidak dapat dibatalkan.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center gap-2">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>Batal</Button>
          <Button onClick={handleDelete} disabled={loading} className="bg-red-600 hover:bg-red-700 text-white">
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Menghapus...</> : <><Trash2 className="mr-2 h-4 w-4" />Ya, Hapus</>}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}