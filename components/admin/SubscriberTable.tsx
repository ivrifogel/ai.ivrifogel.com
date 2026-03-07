'use client'

import { useState, useEffect, useCallback } from 'react'
import { ADMIN_SLUG } from '@/lib/admin-config'

type Subscriber = {
  id: string
  email: string
  first_name: string | null
  source: string | null
  subscribed_at: string
  is_active: boolean
}

type SubscriberResponse = {
  subscribers: Subscriber[]
  total: number
  page: number
  totalPages: number
}

export default function SubscriberTable({ initial }: { initial: SubscriberResponse }) {
  const [data, setData] = useState(initial)
  const [page, setPage] = useState(initial.page)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchPage = useCallback(async (p: number, q: string) => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(p), limit: '50' })
    if (q) params.set('search', q)
    const res = await fetch(`/api/${ADMIN_SLUG}/subscribers?${params}`)
    const json = await res.json()
    setData(json)
    setPage(p)
    setLoading(false)
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => fetchPage(1, search), 300)
    return () => clearTimeout(timeout)
  }, [search, fetchPage])

  return (
    <div>
      {/* Search + Export */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by email..."
          className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-black placeholder:text-gray-400 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-200 sm:w-72"
        />
        <a
          href={`/api/${ADMIN_SLUG}/subscribers/export`}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50"
        >
          Export CSV
        </a>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-500">Name</th>
              <th className="px-4 py-3 font-medium text-gray-500">Email</th>
              <th className="px-4 py-3 font-medium text-gray-500">Source</th>
              <th className="px-4 py-3 font-medium text-gray-500">Date</th>
              <th className="px-4 py-3 font-medium text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody className={loading ? 'opacity-50' : ''}>
            {data.subscribers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                  No subscribers found
                </td>
              </tr>
            ) : (
              data.subscribers.map((sub) => (
                <tr key={sub.id} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-3 text-black">{sub.first_name ?? '—'}</td>
                  <td className="px-4 py-3 font-medium text-black">{sub.email}</td>
                  <td className="px-4 py-3 text-gray-500">{sub.source ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(sub.subscribed_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                        sub.is_active
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {sub.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data.totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-gray-400">
            {data.total} subscriber{data.total !== 1 ? 's' : ''}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => fetchPage(page - 1, search)}
              disabled={page <= 1 || loading}
              className="rounded-md border border-gray-200 px-3 py-1.5 text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-40"
            >
              Previous
            </button>
            <span className="flex items-center px-2 text-gray-400">
              {page} / {data.totalPages}
            </span>
            <button
              onClick={() => fetchPage(page + 1, search)}
              disabled={page >= data.totalPages || loading}
              className="rounded-md border border-gray-200 px-3 py-1.5 text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
