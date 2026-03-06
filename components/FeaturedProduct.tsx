import Link from 'next/link'
import { Product } from '@/lib/supabase'
import PriceBadge from './PriceBadge'
import CategoryIcon from './CategoryIcon'

type FeaturedProductProps = {
  product: Product
}

export default function FeaturedProduct({ product }: FeaturedProductProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-16">
      <Link href={`/products/${product.slug}`} className="group block">
        <div className="overflow-hidden rounded-2xl border border-border bg-white transition-all duration-200 group-hover:shadow-lg group-hover:shadow-black/[0.06]">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Thumbnail */}
            <div className="relative flex items-center justify-center bg-gradient-to-br from-surface to-surface-dark lg:col-span-3">
              <div className="flex aspect-[16/9] w-full items-center justify-center overflow-hidden lg:aspect-auto lg:min-h-[320px]">
                {product.thumbnail_url ? (
                  <img
                    src={product.thumbnail_url}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                ) : (
                  <>
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.12]"
                      style={{
                        backgroundImage: 'radial-gradient(circle, #9ca3af 0.5px, transparent 0.5px)',
                        backgroundSize: '20px 20px',
                      }}
                    />
                    <CategoryIcon category={product.category} className="relative h-16 w-16 text-muted-light/40" />
                  </>
                )}
              </div>
              <div className="absolute left-4 top-4">
                <span className="rounded-lg bg-foreground px-3 py-1 text-[11px] font-medium text-white">
                  Featured
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center p-8 lg:col-span-2 lg:p-10">
              <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.15em] text-muted-light">
                {product.category}
              </div>
              <h3 className="mb-2 text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
                {product.name}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-muted line-clamp-3 lg:text-base">
                {product.short_desc}
              </p>

              <div className="mb-6">
                <PriceBadge type={product.type} priceCents={product.price_cents} size="md" />
              </div>

              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                View Product
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  )
}
