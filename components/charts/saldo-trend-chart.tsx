'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts'
import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'
import { formatRupiah, getNamaBulan } from '@/lib/format'
import type { TransaksiKeuangan } from '@/lib/types/database'

interface SaldoTrendChartProps {
  transaksi: TransaksiKeuangan[]
  title?: string
  description?: string
}

interface ChartData {
  bulan: string
  bulanFull: string
  saldo: number
  saldoBulan: number
}

function buildChartData(transaksi: TransaksiKeuangan[]): ChartData[] {
  // Group by bulan-tahun
  const sortedTransaksi = [...transaksi].sort(
    (a, b) => new Date(a.tanggal).getTime() - new Date(b.tanggal).getTime()
  )

  const monthlyMap = new Map<string, { tahun: number; bulan: number; saldoBulan: number }>()

  for (const t of sortedTransaksi) {
    const date = new Date(t.tanggal)
    const tahun = date.getFullYear()
    const bulan = date.getMonth() + 1
    const key = `${tahun}-${String(bulan).padStart(2, '0')}`

    if (!monthlyMap.has(key)) {
      monthlyMap.set(key, { tahun, bulan, saldoBulan: 0 })
    }

    const entry = monthlyMap.get(key)!
    entry.saldoBulan += t.jenis === 'pemasukan' ? t.nominal : -t.nominal
  }

  // Build cumulative saldo
  const sortedKeys = Array.from(monthlyMap.keys()).sort()
  let runningSaldo = 0
  const data: ChartData[] = []

  for (const key of sortedKeys) {
    const entry = monthlyMap.get(key)!
    runningSaldo += entry.saldoBulan
    data.push({
      bulan: getNamaBulan(entry.bulan).substring(0, 3),
      bulanFull: `${getNamaBulan(entry.bulan)} ${entry.tahun}`,
      saldo: runningSaldo,
      saldoBulan: entry.saldoBulan,
    })
  }

  return data
}

export function SaldoTrendChart({ transaksi, title = 'Tren Saldo Bulanan', description }: SaldoTrendChartProps) {
  const data = buildChartData(transaksi)

  if (data.length === 0) {
    return (
      <Card className="border-0 bg-white">
        <CardContent className="p-12 text-center">
          <TrendingUp className="h-16 w-16 mx-auto text-stone-300 mb-4" />
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
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSaldo" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f97316" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#f97316" stopOpacity={0.05} />
              </linearGradient>
            </defs>
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
              formatter={(value) => [formatRupiah(Number(value)), 'Saldo']}
              labelFormatter={(label, payload) => {
                if (payload && payload.length > 0) {
                  return payload[0].payload.bulanFull
                }
                return label
              }}
            />
            <Area
              type="monotone"
              dataKey="saldo"
              stroke="#ea580c"
              strokeWidth={3}
              fill="url(#colorSaldo)"
              dot={{ fill: '#ea580c', r: 4 }}
              activeDot={{ r: 6, fill: '#dc2626' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}