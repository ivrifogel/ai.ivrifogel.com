import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-8 pt-0">
      <div className="mx-auto max-w-sm text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
          <svg
            className="h-7 w-7 text-emerald-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>

        <h1 className="mb-3 text-xl font-semibold text-black">Payment Successful</h1>
        <p className="mb-8 text-sm text-gray-500">
          Check your email for the download link. It should arrive within a few minutes.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-md bg-black px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Back to store &rarr;
        </Link>
      </div>
    </div>
  )
}
