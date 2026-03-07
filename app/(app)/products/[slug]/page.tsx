import { notFound } from 'next/navigation'
import EmailCapture from '@/components/EmailCapture'
import BuyButton from '@/components/BuyButton'
import CategoryIcon from '@/components/CategoryIcon'
import { supabaseAdmin } from '@/lib/supabase'
import { mockProducts } from '@/lib/mock-data'

async function getProduct(slug: string) {
  try {
    const { data } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single()
    if (data) return data
  } catch {}
  return mockProducts.find((p) => p.slug === slug) || null
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  const price = product.price_cents === 0
    ? 'Free'
    : `$${(product.price_cents / 100).toFixed(product.price_cents % 100 === 0 ? 0 : 2)}`

  return (
    <div className="px-4 py-8 pt-16 sm:px-8 lg:pt-8">
      <div className="mx-auto max-w-2xl">
        {/* Hero image */}
        <div className="mb-8 aspect-[16/9] w-full overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 to-gray-100">
          {product.thumbnail_url ? (
            <img
              src={product.thumbnail_url}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <CategoryIcon category={product.category} className="h-16 w-16 text-gray-300" />
            </div>
          )}
        </div>

        {/* Product label */}
        <div className="mb-3 text-[11px] font-medium uppercase tracking-widest text-gray-400">
          {product.name}
        </div>

        {/* Outcome-driven headline */}
        <h1 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
          {product.short_desc}
        </h1>

        {/* Supporting copy */}
        {product.description && (
          <div className="mt-4 space-y-3 text-[16px] leading-relaxed text-gray-500">
            {product.description.split('\n').map((line: string, i: number) => {
              if (line.startsWith('## ')) {
                return (
                  <h2 key={i} className="mt-6 text-lg font-semibold text-black">
                    {line.replace('## ', '')}
                  </h2>
                )
              }
              if (line.startsWith('- ')) {
                return (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="mt-2.5 block h-1 w-1 flex-shrink-0 rounded-full bg-gray-400" />
                    <span>{line.replace('- ', '')}</span>
                  </div>
                )
              }
              if (line.trim() === '') return null
              return <p key={i}>{line}</p>
            })}
          </div>
        )}

        {/* CTA */}
        <div className="mt-8">
          {product.type === 'free' ? (
            <EmailCapture
              productId={product.id}
              productSlug={product.slug}
              ctaText="Get the Free Plugin"
            />
          ) : (
            <div className="flex items-center gap-4">
              <BuyButton productId={product.id} priceCents={product.price_cents} />
              <span className="text-lg font-bold text-black">{price}</span>
            </div>
          )}
          <p className="mt-2 text-[11px] text-gray-400">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>

        {/* Objection-handling bullets */}
        {product.features && product.features.length > 0 && (
          <div className="mt-10 space-y-4">
            {product.features.map((feature: string, i: number) => (
              <div key={i} className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[15px] leading-snug text-gray-600">{feature}</span>
              </div>
            ))}
          </div>
        )}

        {/* Social proof */}
        <div className="mt-10 border-t border-gray-100 pt-8">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-gray-200 to-gray-300"
                />
              ))}
            </div>
            <p className="text-sm text-gray-500">
              Joined by <span className="font-medium text-gray-700">500+</span> professionals
            </p>
          </div>
        </div>

        {/* Demo link */}
        {product.demo_url && (
          <div className="mt-6">
            <a
              href={product.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-black transition-colors hover:text-gray-500"
            >
              View Live Demo
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
        )}

        {/* Privacy / Terms footer */}
        <div className="mt-12 border-t border-gray-100 pt-6">
          <p className="text-[11px] text-gray-400">
            By downloading, you agree to our{' '}
            <a href="/privacy" className="underline hover:text-gray-600">Privacy Policy</a>
            {' '}and{' '}
            <a href="/terms" className="underline hover:text-gray-600">Terms of Service</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
