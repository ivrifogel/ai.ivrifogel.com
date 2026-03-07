'use client'

import { useState } from 'react'

type EmailCaptureProps = {
  productId: string
  productSlug: string
  ctaText?: string
}

export default function EmailCapture({ productId, productSlug, ctaText }: EmailCaptureProps) {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !firstName.trim()) return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/free-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, email, firstName: firstName.trim() }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      // Trigger download via hidden link to avoid navigating away
      const a = document.createElement('a')
      a.href = data.downloadUrl
      a.download = ''
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-md border border-emerald-200 bg-emerald-50 p-3">
        <p className="text-sm text-emerald-600">Your download has started! Check your email too.</p>
      </div>
    )
  }

  const inputClass =
    'w-full rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm text-black placeholder:text-gray-400 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-200'

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name"
          required
          className={`sm:w-[140px] ${inputClass}`}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          required
          className={`flex-1 ${inputClass}`}
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full whitespace-nowrap rounded-md bg-black px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === 'loading' ? 'Sending...' : (ctaText || 'Download Free')}
      </button>
      {status === 'error' && (
        <p className="text-xs text-red-500">{errorMsg}</p>
      )}
    </form>
  )
}
