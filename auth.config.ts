import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
	providers: [],
	session: { strategy: 'jwt' },
	pages: {
		signIn: '/auth',
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id
			}
			return token
		},
		async session({ session, token }) {
			if (token?.id) {
				session.user.id = token.id as string
			}
			return session
		},
	},
} satisfies NextAuthConfig
