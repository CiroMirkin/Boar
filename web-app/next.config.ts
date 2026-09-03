import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	serverExternalPackages: ['pg', '@prisma/adapter-pg'],
	experimental: {
		serverActions: {
			allowedOrigins: ['localhost:3000'],
		},
	},
}

export default nextConfig
