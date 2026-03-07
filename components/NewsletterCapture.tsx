'use client'

import { useState } from 'react'

export default function NewsletterCapture() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success'>('idle')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('success')
    setEmail('')
  }

  if (status === 'success') {
    return (
      <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-black">
        Thanks! You&apos;re on the list.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="w-full border border-border bg-surface px-5 py-4 font-mono text-[13px] text-black placeholder:text-secondary focus:border-black focus:outline-none transition-colors sm:max-w-[400px]"
      />
      <button
        type="submit"
        className="bg-black px-6 py-4 font-mono text-[12px] font-semibold uppercase tracking-[0.1em] text-white transition-colors duration-200 hover:bg-[#333]"
      >
        Subscribe
      </button>
    </form>
  )
}
