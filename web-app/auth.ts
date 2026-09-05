import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/shared/lib/prisma'
import { isRateLimited } from '@/shared/lib/rateLimit'
import bcrypt from 'bcryptjs'
import { authConfig } from './auth.config'

const DUMMY_HASH = '$2a$12$CwTycUXWue0Thq9StjUM0uJ8Hkm7hxWQlkUdmMkQ8tQ3P8xzeqTr.'

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
				const emailRaw = credentials?.email
				const password = credentials?.password
				if (
					typeof emailRaw !== 'string' ||
					typeof password !== 'string' ||
					!emailRaw ||
					!password
				) {
					return null
				}
				const email = emailRaw.toLowerCase()

				if (isRateLimited(`login:${email}`, 5, 60_000)) return null

				const user = await prisma.user.findUnique({
					where: { email },
				})

				if (!user || !user.password) {
					// gasta el mismo tiempo que una comparacion con un hash real
					await bcrypt.compare(password, DUMMY_HASH)
					return null
				}

				const passwordMatch = await bcrypt.compare(password, user.password)

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
