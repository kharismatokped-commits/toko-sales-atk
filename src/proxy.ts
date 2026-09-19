import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Public paths that don't need auth
const PUBLIC_PATHS = ['/login']

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (PUBLIC_PATHS.some(p => pathname.startsWith(p))) {
    return NextResponse.next()
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|api).*)'],
}
