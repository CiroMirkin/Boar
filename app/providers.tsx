'use client'

import '../src/i18next/index'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster as SonnerToaster } from 'sonner'
import { useState, type ReactNode } from 'react'
import SessionProvider from '@/auth/contexts/SessionProvider'
import { ThemeProvider } from '@/modules/Theme/ThemeContext'
import { useUserSystemTheme } from '@/modules/Theme/useUserSystemTheme'
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

	const defaultTheme = useUserSystemTheme()
	const [theme, setTheme] = useLocalStorage('boar-theme', defaultTheme)

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
