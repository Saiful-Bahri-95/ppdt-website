import Link from 'next/link'
import { ArrowLeft, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PageHeaderProps {
  title: string
  description?: string
  backHref?: string
  action?: {
    label: string
    href: string
  }
}

export function PageHeader({ title, description, backHref, action }: PageHeaderProps) {
  return (
    <div className="mb-6 md:mb-8">
      {backHref && (
        <Link href={backHref}>
          <Button
            variant="ghost"
            size="sm"
            className="mb-3 -ml-2 text-stone-400 hover:text-orange-400 hover:bg-stone-800"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Kembali
          </Button>
        </Link>
      )}

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-extrabold text-stone-50">{title}</h1>
          {description && <p className="text-sm md:text-base text-stone-400 mt-1">{description}</p>}
        </div>

        {action && (
          <Link href={action.href}>
            <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white shadow-lg shadow-orange-500/30 rounded-full">
              <Plus className="h-4 w-4 mr-1" />
              {action.label}
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}