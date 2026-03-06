import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-8 pt-0">
      <div className="text-center">
        <h1 className="mb-2 text-5xl font-bold text-black">404</h1>
        <p className="mb-8 text-sm text-gray-500">This page doesn&apos;t exist.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 px-6 py-2.5 text-sm font-medium text-black transition-colors hover:bg-black hover:text-white"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
