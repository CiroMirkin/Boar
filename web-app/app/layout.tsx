import type { Metadata } from 'next'
import './globals.css'
import Providers from './providers'

export const metadata: Metadata = {
	title: 'Capo',
	description: 'Tablero Kanban',
	icons: { icon: '/capo.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='es' suppressHydrationWarning>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
