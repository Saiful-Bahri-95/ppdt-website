'use client'

import { useState } from 'react'
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

interface DeleteButtonProps {
  itemName: string
  onDelete: () => Promise<void>
}

export function DeleteButton({ itemName, onDelete }: DeleteButtonProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleConfirm() {
    setLoading(true)
    try {
      await onDelete()
      setOpen(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-stone-400 hover:text-red-400 hover:bg-red-950/50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="w-12 h-12 mx-auto rounded-full bg-red-950/50 flex items-center justify-center mb-2">
            <AlertTriangle className="h-6 w-6 text-red-400" />
          </div>
          <DialogTitle className="text-center">Hapus {itemName}?</DialogTitle>
          <DialogDescription className="text-center">
            Tindakan ini tidak dapat dibatalkan.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center gap-2">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
            Batal
          </Button>
          <Button onClick={handleConfirm} disabled={loading} className="bg-red-600 hover:bg-red-700 text-white">
            {loading ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Menghapus...</>
            ) : (
              <><Trash2 className="mr-2 h-4 w-4" />Ya, Hapus</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}