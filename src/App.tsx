import './App.css'
import Router from './Router'
import { Toaster } from './ui/toaster'
import './i18next/index'
import { useUserPreffedLanguage } from './hooks/useUserPreffedLanguage'

function App() {
	useUserPreffedLanguage()
	return (
		<>
			<Router />
			<Toaster />
		</>
	)
}

export default App
