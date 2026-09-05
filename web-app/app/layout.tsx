import type { Metadata } from 'next'
import './globals.css'
import Providers from './providers'

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
	title: { default: 'Capo', template: '%s · Capo' },
	description: 'Tablero Kanban',
	applicationName: 'Capo',
	icons: { icon: '/capo.svg' },
	openGraph: {
		title: 'Capo',
		description: 'Tablero Kanban',
		siteName: 'Capo',
		type: 'website',
		locale: 'es',
		images: ['/Boar_OG.png'],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Capo',
		description: 'Tablero Kanban',
		images: ['/Boar_OG.png'],
	},
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
