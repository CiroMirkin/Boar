import './App.css'
import Router from './Router'
import { Toaster } from './ui/toaster'
import './i18next/index'
import { useUserPreffedLanguage } from './modules/shared/hooks/useUserPreffedLanguage'
import { ThemeProvider } from './modules/shared/Theme/ThemeContext'
import { useLocalStorage } from '@uidotdev/usehooks'
import { defaultColorTheme } from './modules/shared/Theme/colors'

function App() {
	useUserPreffedLanguage()
	const [theme, setTheme] = useLocalStorage('boar-theme', defaultColorTheme)
	return (
		<>
			<ThemeProvider theme={theme} changeTheme={setTheme}>
				<Router />
				<Toaster />
			</ThemeProvider>
		</>
	)
}

export default App
