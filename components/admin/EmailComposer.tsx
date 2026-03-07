'use client'

import { useState, useMemo } from 'react'
import { marked } from 'marked'
import { ADMIN_SLUG } from '@/lib/admin-config'
import EmailPreview from './EmailPreview'

export default function EmailComposer({ subscriberCount }: { subscriberCount: number }) {
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [result, setResult] = useState<{ sent: number; failed: number } | null>(null)

  const html = useMemo(() => {
    if (!body) return ''
    return marked(body, { breaks: true }) as string
  }, [body])

  async function handleSend() {
    if (!subject || !body) return

    const confirmed = confirm(
      `Send this email to ${subscriberCount} active subscriber${subscriberCount !== 1 ? 's' : ''}?`
    )
    if (!confirmed) return

    setStatus('sending')
    setResult(null)

    try {
      const res = await fetch(`/api/${ADMIN_SLUG}/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, html }),
      })

      const data = await res.json()

      if (!res.ok) {
        setStatus('error')
        setResult({ sent: 0, failed: 0 })
        return
      }

      setStatus('sent')
      setResult({ sent: data.sent, failed: data.failed })
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-black placeholder:text-gray-400 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-200'

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Compose */}
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Email subject line"
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Body (Markdown)
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={16}
            placeholder="Write your email in Markdown...&#10;&#10;# Heading&#10;&#10;Paragraph text with **bold** and *italic*.&#10;&#10;- Bullet point&#10;- Another point"
            className={inputClass + ' font-mono text-[13px]'}
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleSend}
            disabled={!subject || !body || status === 'sending'}
            className="rounded-lg bg-black px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {status === 'sending'
              ? 'Sending...'
              : `Send to ${subscriberCount} subscriber${subscriberCount !== 1 ? 's' : ''}`}
          </button>

          {status === 'sent' && result && (
            <span className="text-sm text-emerald-600">
              Sent {result.sent}{result.failed > 0 ? `, ${result.failed} failed` : ''}
            </span>
          )}
          {status === 'error' && (
            <span className="text-sm text-red-500">Failed to send</span>
          )}
        </div>
      </div>

      {/* Preview */}
      <EmailPreview subject={subject} html={html} />
    </div>
  )
}
