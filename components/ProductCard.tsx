'use client'

import Link from 'next/link'
import { Product } from '@/lib/supabase'
import CategoryIcon from './CategoryIcon'
import TiltedCard from './TiltedCard'

function formatPrice(type: string, priceCents: number | null): string {
  if (type === 'free') return 'Free'
  if (!priceCents) return 'Free'
  return `$${(priceCents / 100).toFixed(priceCents % 100 === 0 ? 0 : 2)}`
}

type ProductCardProps = {
  product: Product
  className?: string
}

export default function ProductCard({ product, className = '' }: ProductCardProps) {
  const priceLabel = formatPrice(product.type, product.price_cents)

  return (
    <TiltedCard rotateAmplitude={12} scaleOnHover={1.04} caption={priceLabel}>
      <Link href={`/products/${product.slug}`} className={`group block ${className}`}>
        <div className="h-full overflow-hidden rounded-xl border border-border bg-white shadow-sm">
          {/* Thumbnail area */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
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
          </div>

          {/* Content */}
          <div className="p-3">
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
    </TiltedCard>
  )
}
