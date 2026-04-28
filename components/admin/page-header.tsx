import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus } from 'lucide-react'

interface PageHeaderProps {
  title: string
  description?: string
  backHref?: string
  action?: {
    label: string
    href: string
    icon?: React.ComponentType<{ className?: string }>
  }
}

export function PageHeader({ title, description, backHref, action }: PageHeaderProps) {
  const ActionIcon = action?.icon || Plus

  return (
    <div className="mb-6">
      {backHref && (
        <Link href={backHref}>
          <Button variant="ghost" size="sm" className="mb-3 -ml-3 text-stone-600 hover:text-orange-600">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Kembali
          </Button>
        </Link>
      )}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-extrabold text-stone-900">{title}</h1>
          {description && <p className="text-stone-600 mt-1 text-sm md:text-base">{description}</p>}
        </div>
        {action && (
          <Link href={action.href}>
            <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white shadow-lg shadow-orange-500/30 rounded-full">
              <ActionIcon className="mr-2 h-4 w-4" />
              {action.label}
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}