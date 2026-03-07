'use client'

import { useState } from 'react'

type EmailCaptureProps = {
  productId: string
  productSlug: string
}

export default function EmailCapture({ productId, productSlug }: EmailCaptureProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/free-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, email }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      window.location.href = data.downloadUrl
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-md border border-emerald-200 bg-emerald-50 p-3">
        <p className="text-sm text-emerald-600">Check your email for the download link!</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="flex-1 rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm text-black placeholder:text-gray-400 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-200"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="whitespace-nowrap rounded-md bg-black px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === 'loading' ? 'Sending...' : 'Download Free'}
      </button>
      {status === 'error' && (
        <p className="col-span-full text-xs text-red-500">{errorMsg}</p>
      )}
    </form>
  )
}
