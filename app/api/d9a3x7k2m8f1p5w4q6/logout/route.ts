import { NextResponse } from 'next/server'
import { getClearCookieOptions } from '@/lib/admin-auth'

export async function POST() {
  const response = NextResponse.json({ success: true })
  const cookie = getClearCookieOptions()
  response.cookies.set(cookie)
  return response
}
