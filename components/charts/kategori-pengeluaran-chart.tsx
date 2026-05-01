'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { Card, CardContent } from '@/components/ui/card'
import { PieChart as PieChartIcon } from 'lucide-react'
import { formatRupiah } from '@/lib/format'
import type { TransaksiKeuangan } from '@/lib/types/database'

const COLORS = [
  '#dc2626', // red-600
  '#ea580c', // orange-600
  '#f59e0b', // amber-500
  '#eab308', // yellow-500
  '#84cc16', // lime-500
  '#06b6d4', // cyan-500
  '#8b5cf6', // violet-500
  '#ec4899', // pink-500
]

interface CategoryData {
  kategori: string
  total: number
  percentage: number
}

function buildCategoryData(transaksi: TransaksiKeuangan[]): CategoryData[] {
  const pengeluaran = transaksi.filter((t) => t.jenis === 'pengeluaran')
  const total = pengeluaran.reduce((acc, t) => acc + t.nominal, 0)

  if (total === 0) return []

  const map = new Map<string, number>()
  for (const t of pengeluaran) {
    map.set(t.kategori, (map.get(t.kategori) || 0) + t.nominal)
  }

  return Array.from(map.entries())
    .map(([kategori, totalKategori]) => ({
      kategori,
      total: totalKategori,
      percentage: (totalKategori / total) * 100,
    }))
    .sort((a, b) => b.total - a.total)
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    name?: string | number
    value?: string | number
    payload: CategoryData
  }>
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null

  const data = payload[0].payload
  return (
    <div className="bg-white border border-stone-200 rounded-xl px-3 py-2 shadow-lg">
      <p className="font-semibold text-sm text-stone-900">{data.kategori}</p>
      <p className="text-xs text-stone-600">{formatRupiah(data.total)}</p>
      <p className="text-xs text-orange-600 font-medium">{data.percentage.toFixed(1)}%</p>
    </div>
  )
}

interface Props {
  transaksi: TransaksiKeuangan[]
  title?: string
  description?: string
}

export function KategoriPengeluaranChart({ transaksi, title = 'Kategori Pengeluaran', description }: Props) {
  const data = buildCategoryData(transaksi)

  if (data.length === 0) {
    return (
      <Card className="border-0 bg-white">
        <CardContent className="p-12 text-center">
          <PieChartIcon className="h-16 w-16 mx-auto text-stone-300 mb-4" />
          <p className="text-stone-500">Belum ada data pengeluaran untuk ditampilkan.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 bg-white shadow-lg shadow-orange-500/10">
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="font-display font-bold text-lg md:text-xl text-stone-900">{title}</h3>
          {description && <p className="text-sm text-stone-500 mt-1">{description}</p>}
        </div>

        <div className="grid md:grid-cols-2 gap-4 items-center">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                dataKey="total"
                nameKey="kategori"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={2}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          <div className="space-y-2">
            {data.map((item, index) => (
              <div key={item.kategori} className="flex items-center justify-between gap-2 text-sm">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <div
                    className="w-3 h-3 rounded-sm flex-shrink-0"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-stone-700 truncate">{item.kategori}</span>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-semibold text-stone-900">{item.percentage.toFixed(1)}%</p>
                  <p className="text-xs text-stone-500">{formatRupiah(item.total)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}