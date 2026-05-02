'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { Card, CardContent } from '@/components/ui/card'
import { BarChart3 } from 'lucide-react'
import { formatRupiah, getNamaBulan } from '@/lib/format'
import type { TransaksiKeuangan } from '@/lib/types/database'

interface ChartData {
  bulan: string
  bulanFull: string
  pemasukan: number
  pengeluaran: number
}

function buildChartData(transaksi: TransaksiKeuangan[]): ChartData[] {
  const monthlyMap = new Map<string, ChartData>()

  for (const t of transaksi) {
    const date = new Date(t.tanggal)
    const tahun = date.getFullYear()
    const bulan = date.getMonth() + 1
    const key = `${tahun}-${String(bulan).padStart(2, '0')}`

    if (!monthlyMap.has(key)) {
      monthlyMap.set(key, {
        bulan: getNamaBulan(bulan).substring(0, 3),
        bulanFull: `${getNamaBulan(bulan)} ${tahun}`,
        pemasukan: 0,
        pengeluaran: 0,
      })
    }

    const entry = monthlyMap.get(key)!
    if (t.jenis === 'pemasukan') {
      entry.pemasukan += t.nominal
    } else {
      entry.pengeluaran += t.nominal
    }
  }

  const sortedKeys = Array.from(monthlyMap.keys()).sort()
  return sortedKeys.map((key) => monthlyMap.get(key)!)
}

interface Props {
  transaksi: TransaksiKeuangan[]
  title?: string
  description?: string
}

export function PemasukanPengeluaranChart({ transaksi, title = 'Pemasukan vs Pengeluaran', description }: Props) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const isDark = mounted && resolvedTheme === 'dark'
  const data = buildChartData(transaksi)

  if (data.length === 0) {
    return (
      <Card className="border-0 bg-white dark:bg-stone-900">
        <CardContent className="p-12 text-center">
          <BarChart3 className="h-16 w-16 mx-auto text-stone-300 dark:text-stone-600 mb-4" />
          <p className="text-stone-500 dark:text-stone-400">Belum ada data transaksi untuk ditampilkan.</p>
        </CardContent>
      </Card>
    )
  }

  const gridColor = isDark ? '#44403c' : '#e7e5e4'
  const axisColor = isDark ? '#a8a29e' : '#78716c'
  const tooltipBg = isDark ? '#1c1917' : 'white'
  const tooltipBorder = isDark ? '#44403c' : '#e7e5e4'
  const tooltipText = isDark ? '#fafaf9' : '#1c1917'
  const legendColor = isDark ? '#d6d3d1' : '#57534e'

  return (
    <Card className="border-0 bg-white dark:bg-stone-900 shadow-lg shadow-orange-500/10">
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="font-display font-bold text-lg md:text-xl text-stone-900 dark:text-stone-50">{title}</h3>
          {description && <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">{description}</p>}
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="bulan" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke={axisColor} fontSize={11} tickLine={false} axisLine={false}
              tickFormatter={(value) => `${(value / 1000000).toFixed(1)}jt`} />
            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBg,
                border: `1px solid ${tooltipBorder}`,
                borderRadius: '12px',
                fontSize: '13px',
                boxShadow: '0 4px 20px rgba(249, 115, 22, 0.15)',
                color: tooltipText,
              }}
              labelStyle={{ color: tooltipText }}
              itemStyle={{ color: tooltipText }}
              formatter={(value) => formatRupiah(Number(value))}
              labelFormatter={(label, payload) => {
                if (payload && payload.length > 0) {
                  return payload[0].payload.bulanFull
                }
                return label
              }}
            />
            <Legend
              iconType="circle"
              wrapperStyle={{ fontSize: '13px', paddingTop: '10px', color: legendColor }}
            />
            <Bar dataKey="pemasukan" name="Pemasukan" fill="#16a34a" radius={[8, 8, 0, 0]} maxBarSize={40} />
            <Bar dataKey="pengeluaran" name="Pengeluaran" fill="#dc2626" radius={[8, 8, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}