'use client'

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
  const data = buildChartData(transaksi)

  if (data.length === 0) {
    return (
      <Card className="border-0 bg-white">
        <CardContent className="p-12 text-center">
          <BarChart3 className="h-16 w-16 mx-auto text-stone-300 mb-4" />
          <p className="text-stone-500">Belum ada data transaksi untuk ditampilkan.</p>
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

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
            <XAxis
              dataKey="bulan"
              stroke="#78716c"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#78716c"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${(value / 1000000).toFixed(1)}jt`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e7e5e4',
                borderRadius: '12px',
                fontSize: '13px',
                boxShadow: '0 4px 20px rgba(249, 115, 22, 0.15)',
              }}
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
              wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }}
            />
            <Bar
              dataKey="pemasukan"
              name="Pemasukan"
              fill="#16a34a"
              radius={[8, 8, 0, 0]}
              maxBarSize={40}
            />
            <Bar
              dataKey="pengeluaran"
              name="Pengeluaran"
              fill="#dc2626"
              radius={[8, 8, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}