import { auth } from './auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes accessible without authentication
const PUBLIC_ROUTES = [
	'/auth',
	'/help',
	'/board/1', // guest board
]

// Check if a path starts with any of the public prefixes
function isPublicRoute(pathname: string): boolean {
	return PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route + '/'))
}

export default auth((req: NextRequest & { auth: unknown }) => {
	const { pathname } = req.nextUrl

	// API routes and Next.js internals are always public
	if (pathname.startsWith('/api/') || pathname.startsWith('/_next/')) {
		return NextResponse.next()
	}

	const isAuthenticated = !!req.auth

	// Redirect unauthenticated users from protected routes to /auth
	if (!isAuthenticated && !isPublicRoute(pathname)) {
		const authUrl = new URL('/auth', req.url)
		return NextResponse.redirect(authUrl)
	}

	return NextResponse.next()
})

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|fonts|.*\\.svg|.*\\.png).*)'],
}
