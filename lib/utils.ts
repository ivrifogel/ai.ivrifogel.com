import { randomBytes } from 'crypto'

export function generateToken(): string {
  return randomBytes(32).toString('hex')
}

export function formatPrice(cents: number): string {
  if (cents === 0) return 'FREE'
  return `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`
}

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
}
