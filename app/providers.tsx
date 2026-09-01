'use client'

import '../src/i18next/index'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster as SonnerToaster } from 'sonner'
import { useEffect, useState, type ReactNode } from 'react'
import SessionProvider from '@/auth/contexts/SessionProvider'
import { ThemeProvider } from '@/modules/Theme/ThemeContext'
import { darkTheme, lightTheme, type Theme } from '@/modules/Theme/themesList'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { useIsHydrated } from '@/common/hooks/useIsHydrated'
import { useUserPreffedLanguage } from '@/modules/LanguageToggle/useUserPreffedLanguage'
import { useSetLanguageSaved } from '@/modules/LanguageToggle/useSetLanguageSaved'
import { useSaveTimeTracking } from '@/modules/UsageHistory/hooks/useSaveTimeTracking'

function ClientOnlyInit() {
	useSaveTimeTracking()
	useSetLanguageSaved()
	useUserPreffedLanguage()
	return null
}

function AppInit({ children }: { children: ReactNode }) {
	const mounted = useIsHydrated()

	// clave 'boar-theme' (nombre anterior del proyecto): no renombrar para no invalidar el localStorage de usuarios existentes
	const [theme, setTheme] = useLocalStorage<Theme>('boar-theme', lightTheme)

	useEffect(() => {
		try {
			if (window.localStorage.getItem('boar-theme') !== null) return
		} catch {
			return
		}
		if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
			setTheme(darkTheme)
		}
	}, [setTheme])

	return (
		<ThemeProvider theme={theme} changeTheme={setTheme}>
			{mounted && <ClientOnlyInit />}
			{children}
			<SonnerToaster position='top-center' richColors closeButton />
		</ThemeProvider>
	)
}

export default function Providers({ children }: { children: ReactNode }) {
	const [queryClient] = useState(() => new QueryClient())

	return (
		<SessionProvider>
			<QueryClientProvider client={queryClient}>
				<AppInit>{children}</AppInit>
			</QueryClientProvider>
		</SessionProvider>
	)
}
