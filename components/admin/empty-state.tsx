import Link from 'next/link'
import { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    href: string
  }
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <Card className="border-0 bg-stone-900">
      <CardContent className="p-12 text-center">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/30 opacity-60">
          <Icon className="h-9 w-9 text-white" />
        </div>
        <h3 className="font-display font-bold text-xl text-stone-100 mb-2">{title}</h3>
        <p className="text-sm text-stone-400 mb-6 max-w-md mx-auto leading-relaxed">{description}</p>
        {action && (
          <Link href={action.href}>
            <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white shadow-lg shadow-orange-500/30 rounded-full">
              {action.label}
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  )
}