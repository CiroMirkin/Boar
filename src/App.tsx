import './App.css'
import Router from './Router'
import { Toaster as SonnerToaster } from 'sonner'
import './i18next/index'
import { useUserPreffedLanguage } from './modules/LanguageToggle/useUserPreffedLanguage'
import { ThemeProvider } from './modules/Theme/ThemeContext'
import { useLocalStorage } from '@uidotdev/usehooks'
import { useUserSystemTheme } from './modules/Theme/useUserSystemTheme'
import { useSetLanguageSaved } from './modules/LanguageToggle/useSetLanguageSaved'

function App() {
	useSetLanguageSaved()
	useUserPreffedLanguage()
	const defaultTheme = useUserSystemTheme()
	const [theme, setTheme] = useLocalStorage('boar-theme', defaultTheme)

	return (
		<>
			<ThemeProvider theme={theme} changeTheme={setTheme}>
				<Router />
				<SonnerToaster position='top-center' richColors closeButton />
			</ThemeProvider>
		</>
	)
}

export default App
