'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function DownloadPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const [token, setToken] = useState<string>('')
  const [status, setStatus] = useState<'ready' | 'downloading' | 'error' | 'limit'>('ready')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    params.then((p) => setToken(p.token))
  }, [params])

  async function handleDownload() {
    if (!token) return
    setStatus('downloading')

    try {
      const res = await fetch(`/api/download/${token}`, { redirect: 'manual' })

      if (res.status === 403) {
        setStatus('limit')
        return
      }

      if (!res.ok && res.type !== 'opaqueredirect') {
        const data = await res.json().catch(() => ({ error: 'Download failed' }))
        throw new Error(data.error)
      }

      if (res.redirected) {
        window.open(res.url, '_blank')
        setStatus('ready')
        return
      }

      window.open(`/api/download/${token}`, '_blank')
      setStatus('ready')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Download failed')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-8 pt-0">
      <div className="mx-auto max-w-sm text-center">
        {status === 'limit' ? (
          <>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
              <svg className="h-7 w-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <h1 className="mb-3 text-xl font-semibold text-black">Download Limit Reached</h1>
            <p className="mb-8 text-sm text-gray-500">
              You&apos;ve reached the maximum number of downloads for this link.
              Contact{' '}
              <a href="mailto:start@ivrifogel.com" className="font-medium text-black underline">
                start@ivrifogel.com
              </a>{' '}
              for help.
            </p>
          </>
        ) : (
          <>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
              <svg className="h-7 w-7 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
            </div>
            <h1 className="mb-3 text-xl font-semibold text-black">Your Download is Ready</h1>
            <p className="mb-8 text-sm text-gray-500">
              Click the button below to download your file.
            </p>
            <button
              onClick={handleDownload}
              disabled={status === 'downloading' || !token}
              className="w-full rounded-md bg-black px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {status === 'downloading' ? 'Preparing...' : 'Download Now'}
            </button>
            {status === 'error' && (
              <p className="mt-4 text-xs text-red-500">{errorMsg}</p>
            )}
          </>
        )}

        <div className="mt-8">
          <Link href="/" className="text-sm text-gray-400 transition-colors hover:text-black">
            Browse more tools &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}
