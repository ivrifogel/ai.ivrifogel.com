import { NextRequest, NextResponse } from 'next/server'

const ADMIN_SLUG = 'd9a3x7k2m8f1p5w4q6'

async function generateExpectedToken(): Promise<string> {
  const secret = process.env.ADMIN_SECRET!
  const password = process.env.ADMIN_PASSWORD!
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(password))
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow the login page and login API
  if (
    pathname === `/${ADMIN_SLUG}/login` ||
    pathname === `/api/${ADMIN_SLUG}/login`
  ) {
    return NextResponse.next()
  }

  // Check session cookie
  const token = request.cookies.get('admin_session')?.value
  if (!token) {
    return NextResponse.redirect(new URL(`/${ADMIN_SLUG}/login`, request.url))
  }

  // Verify token
  const expected = await generateExpectedToken()

  if (token !== expected) {
    return NextResponse.redirect(new URL(`/${ADMIN_SLUG}/login`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/d9a3x7k2m8f1p5w4q6/:path*', '/api/d9a3x7k2m8f1p5w4q6/:path*'],
}
