'use client'

import { useMemo } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

type GrowthChartProps = {
  data: { subscribed_at: string }[]
}

export default function GrowthChart({ data }: GrowthChartProps) {
  const chartData = useMemo(() => {
    if (!data.length) return []

    // Group by day and compute cumulative count
    const dayCounts: Record<string, number> = {}
    for (const item of data) {
      const day = item.subscribed_at.slice(0, 10)
      dayCounts[day] = (dayCounts[day] || 0) + 1
    }

    // Fill last 30 days
    const days: { date: string; total: number }[] = []
    let cumulative = 0
    const now = new Date()

    // Count all subscribers before the 30-day window
    const thirtyDaysAgo = new Date(now)
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29)
    const cutoff = thirtyDaysAgo.toISOString().slice(0, 10)
    for (const [day, count] of Object.entries(dayCounts)) {
      if (day < cutoff) cumulative += count
    }

    for (let i = 29; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(d.getDate() - i)
      const key = d.toISOString().slice(0, 10)
      cumulative += dayCounts[key] || 0
      days.push({ date: key, total: cumulative })
    }

    return days
  }, [data])

  if (!chartData.length) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-gray-400">
        No subscriber data yet
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 11, fill: '#9ca3af' }}
          tickFormatter={(v) => v.slice(5)}
        />
        <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} />
        <Tooltip
          contentStyle={{ fontSize: 12, border: '1px solid #e5e7eb', borderRadius: 8 }}
          labelFormatter={(v) => v}
        />
        <Line
          type="monotone"
          dataKey="total"
          stroke="#000"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
