import NextAuth from 'next-auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authConfig } from './auth.config'

const { auth } = NextAuth(authConfig)

const PUBLIC_ROUTES = [
	'/auth',
	'/help',
	'/board/1', // guest board
]

function isPublicRoute(pathname: string): boolean {
	return PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route + '/'))
}

export default auth((req: NextRequest & { auth: unknown }) => {
	const { pathname } = req.nextUrl

	if (pathname.startsWith('/api/') || pathname.startsWith('/_next/')) {
		return NextResponse.next()
	}

	const isAuthenticated = !!req.auth
	if (!isAuthenticated && !isPublicRoute(pathname)) {
		const authUrl = new URL('/auth', req.url)
		return NextResponse.redirect(authUrl)
	}

	return NextResponse.next()
})

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|fonts|.*\\.svg|.*\\.png).*)'],
}
