import './App.css'
import Router from './Router'
import { Toaster } from './ui/toaster'
import './i18next/index'
import { useUserPreffedLanguage } from './modules/shared/hooks/useUserPreffedLanguage'
import { ThemeProvider } from './modules/shared/components/ThemeContext'
import { useState } from 'react'
import { defaultColorTheme } from './modules/shared/configs/colors'

function App() {
	useUserPreffedLanguage()
	const [theme, setTheme] = useState(defaultColorTheme)
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
