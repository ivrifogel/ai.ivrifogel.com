import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-8">
      <div className="max-w-xl text-center">
        <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.15em] text-gray-400">
          AI Tools by Ivri Fogel
        </div>

        <h1 className="mb-4 text-4xl font-bold leading-[1.15] tracking-tight text-black sm:text-5xl">
          AI Tools That Actually Work
        </h1>

        <p className="mx-auto mb-8 max-w-md text-[15px] leading-relaxed text-gray-500">
          Handcrafted tools, templates, and starter kits to help you build faster with AI.
        </p>

        <Link
          href="/browse"
          className="inline-flex items-center gap-2 rounded-md bg-black px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Browse Free Tools
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
