'use client'

import { useState } from 'react'

type BuyButtonProps = {
  productId: string
  priceCents: number
}

export default function BuyButton({ productId, priceCents }: BuyButtonProps) {
  const [loading, setLoading] = useState(false)

  async function handleBuy() {
    setLoading(true)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      window.location.href = data.url
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  const price = `$${(priceCents / 100).toFixed(priceCents % 100 === 0 ? 0 : 2)}`

  return (
    <button
      onClick={handleBuy}
      disabled={loading}
      className="w-full rounded-md bg-black px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
    >
      {loading ? 'Redirecting...' : `Buy Now — ${price}`}
    </button>
  )
}
