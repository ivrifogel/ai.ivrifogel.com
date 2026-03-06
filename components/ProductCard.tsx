import Link from 'next/link'
import { Product } from '@/lib/supabase'
import PriceBadge from './PriceBadge'
import CategoryIcon from './CategoryIcon'

type ProductCardProps = {
  product: Product
  className?: string
}

export default function ProductCard({ product, className = '' }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`} className={`group block ${className}`}>
      <div className="h-full rounded-lg border border-border bg-white p-3 transition-all duration-150 group-hover:-translate-y-px group-hover:border-gray-300 group-hover:shadow-md">
        {/* Thumbnail area */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md bg-gradient-to-br from-gray-50 to-gray-100">
          {product.thumbnail_url ? (
            <img
              src={product.thumbnail_url}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <CategoryIcon category={product.category} className="h-10 w-10 text-gray-300" />
            </div>
          )}

          {/* Price badge */}
          <div className="absolute bottom-2 right-2">
            <PriceBadge type={product.type} priceCents={product.price_cents} />
          </div>
        </div>

        {/* Content */}
        <div className="mt-3">
          <div className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
            {product.category}
          </div>
          <h3 className="mt-1 text-[15px] font-semibold leading-tight text-gray-900">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-gray-500">
            {product.short_desc}
          </p>
        </div>
      </div>
    </Link>
  )
}
