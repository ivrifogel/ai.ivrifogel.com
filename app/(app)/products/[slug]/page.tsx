import { notFound } from 'next/navigation'
import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
import BuyButton from '@/components/BuyButton'
import ProductCard from '@/components/ProductCard'
import CategoryIcon from '@/components/CategoryIcon'
import { mockProducts } from '@/lib/mock-data'

// TODO: Replace mock data with Supabase query
async function getProduct(slug: string) {
  return mockProducts.find((p) => p.slug === slug) || null
}

function getRelatedProducts(currentSlug: string) {
  return mockProducts.filter((p) => p.slug !== currentSlug).slice(0, 3)
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

  const related = getRelatedProducts(slug)
  const price = product.price_cents === 0
    ? 'Free'
    : `$${(product.price_cents / 100).toFixed(product.price_cents % 100 === 0 ? 0 : 2)}`

  return (
    <div className="px-8 py-8">
      <div className="mx-auto max-w-3xl">
        {/* Back link */}
        <Link
          href="/browse"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-black"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to all products
        </Link>

        {/* Large thumbnail */}
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

        {/* Category */}
        {product.category && (
          <div className="mb-2 text-[11px] font-medium uppercase tracking-wide text-gray-400">
            {product.category}
          </div>
        )}

        {/* Title + Price + Buy row */}
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-black">{product.name}</h1>
            <div className="mt-2 text-2xl font-bold text-black">{price}</div>
          </div>

          <div className="w-full sm:w-auto sm:min-w-[220px]">
            {product.type === 'free' ? (
              <EmailCapture productId={product.id} productSlug={product.slug} />
            ) : (
              <BuyButton productId={product.id} priceCents={product.price_cents} />
            )}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-3 text-[15px] leading-[1.7] text-gray-600">
          {product.description?.split('\n').map((line, i) => {
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

        {/* Demo */}
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

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div className="mt-8 border-t border-border-subtle pt-8">
            <h3 className="mb-4 text-lg font-semibold text-black">
              What&apos;s included
            </h3>
            <div className="space-y-3">
              {product.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <svg
                    className="h-4 w-4 flex-shrink-0 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-12 border-t border-border-subtle pt-8">
            <h3 className="mb-6 text-lg font-semibold text-black">More from the store</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
