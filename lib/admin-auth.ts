import { cookies } from 'next/headers'
import { createHmac } from 'crypto'
import { ADMIN_SLUG } from './admin-config'

const COOKIE_NAME = 'admin_session'
const MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export function generateSessionToken(): string {
  const secret = process.env.ADMIN_SECRET!
  const password = process.env.ADMIN_PASSWORD!
  return createHmac('sha256', secret).update(password).digest('hex')
}

export function verifyPassword(input: string): boolean {
  return input === process.env.ADMIN_PASSWORD
}

export async function verifySession(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return false
  return token === generateSessionToken()
}

export function getSessionCookieOptions() {
  return {
    name: COOKIE_NAME,
    value: generateSessionToken(),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path: `/${ADMIN_SLUG}`,
    maxAge: MAX_AGE,
  }
}

export function getClearCookieOptions() {
  return {
    name: COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path: `/${ADMIN_SLUG}`,
    maxAge: 0,
  }
}
