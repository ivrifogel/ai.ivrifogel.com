'use client'

import { useMemo } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

type SourceBreakdownProps = {
  data: { source: string | null }[]
}

export default function SourceBreakdown({ data }: SourceBreakdownProps) {
  const chartData = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const item of data) {
      const source = item.source || 'unknown'
      counts[source] = (counts[source] || 0) + 1
    }
    return Object.entries(counts)
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count)
  }, [data])

  if (!chartData.length) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-gray-400">
        No source data yet
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={Math.max(200, chartData.length * 40)}>
      <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
        <XAxis type="number" tick={{ fontSize: 11, fill: '#9ca3af' }} />
        <YAxis
          type="category"
          dataKey="source"
          tick={{ fontSize: 11, fill: '#9ca3af' }}
          width={140}
        />
        <Tooltip
          contentStyle={{ fontSize: 12, border: '1px solid #e5e7eb', borderRadius: 8 }}
        />
        <Bar dataKey="count" fill="#000" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
