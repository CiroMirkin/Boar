import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { authConfig } from './auth.config'

export const { handlers, auth } = NextAuth({
	...authConfig,
	adapter: PrismaAdapter(prisma),
	providers: [
		GitHub({
			clientId: process.env.AUTH_GITHUB_ID,
			clientSecret: process.env.AUTH_GITHUB_SECRET,
		}),
		Credentials({
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const email = (credentials.email as string).toLowerCase()
				if (!email || !credentials?.password) return null

				const user = await prisma.user.findUnique({
					where: { email: email.toLowerCase() },
				})

				if (!user || !user.password) return null

				const passwordMatch = await bcrypt.compare(
					credentials.password as string,
					user.password
				)

				if (!passwordMatch) return null

				return {
					id: user.id,
					email,
					name: user.name,
					image: user.image,
				}
			},
		}),
	],
})
