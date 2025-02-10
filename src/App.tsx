import './App.css'
import Router from './Router'
import { Toaster } from './ui/toaster'
import './i18next/index'

function App() {
	return (
		<>
			<Router />
			<Toaster />
		</>
	)
}

export default App
