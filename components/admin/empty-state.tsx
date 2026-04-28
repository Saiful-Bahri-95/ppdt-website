import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface EmptyStateProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  action?: {
    label: string
    href: string
  }
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <Card className="border-0 bg-white">
      <CardContent className="p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-orange-100 flex items-center justify-center">
          <Icon className="h-7 w-7 text-orange-500" />
        </div>
        <h3 className="font-display font-bold text-lg text-stone-900 mb-1">{title}</h3>
        <p className="text-sm text-stone-500 mb-5">{description}</p>
        {action && (
          <Link href={action.href}>
            <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white rounded-full">
              <Plus className="mr-2 h-4 w-4" />
              {action.label}
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  )
}