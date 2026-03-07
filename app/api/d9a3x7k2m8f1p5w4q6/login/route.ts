import { NextRequest, NextResponse } from 'next/server'
import { verifyPassword, getSessionCookieOptions } from '@/lib/admin-auth'

export async function POST(req: NextRequest) {
  const { password } = await req.json()

  if (!password || !verifyPassword(password)) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  const response = NextResponse.json({ success: true })
  const cookie = getSessionCookieOptions()
  response.cookies.set(cookie)
  return response
}
