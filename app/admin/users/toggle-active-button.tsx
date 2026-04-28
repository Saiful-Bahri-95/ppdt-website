'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Loader2, UserCheck, UserX } from 'lucide-react'
import { toast } from 'sonner'

export function ToggleActiveButton({ id, isActive, nama }: { id: string; isActive: boolean; nama: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleToggle() {
    if (!confirm(`${isActive ? 'Nonaktifkan' : 'Aktifkan'} akun ${nama}?`)) return
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase
      .from('profiles')
      .update({ is_active: !isActive })
      .eq('id', id)

    if (error) {
      toast.error('Gagal', { description: error.message })
      setLoading(false)
      return
    }
    toast.success(isActive ? 'Akun dinonaktifkan' : 'Akun diaktifkan')
    setLoading(false)
    router.refresh()
  }

  return (
    <Button
      size="sm"
      variant={isActive ? 'outline' : 'default'}
      onClick={handleToggle}
      disabled={loading}
      className={isActive ? 'border-red-200 text-red-600 hover:bg-red-50' : 'bg-green-600 hover:bg-green-700 text-white'}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : isActive ? <><UserX className="h-4 w-4 mr-1" />Nonaktifkan</> : <><UserCheck className="h-4 w-4 mr-1" />Aktifkan</>}
    </Button>
  )
}