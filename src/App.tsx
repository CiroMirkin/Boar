import './App.css'
import Router from './Router'
import { Toaster } from './ui/toaster'
import { Toaster as SonnerToaster } from 'sonner'
import './i18next/index'
import { useUserPreffedLanguage } from './sharedByModules/hooks/useUserPreffedLanguage'
import { ThemeProvider } from './sharedByModules/Theme/ThemeContext'
import { useLocalStorage } from '@uidotdev/usehooks'
import { blankReminder } from './modules/taskList/Reminder/reminder'
import { ReminderProvider } from './modules/taskList/Reminder/ReminderContext'
import { useUserSystemTheme } from './sharedByModules/Theme/useUserSystemTheme'
import { useSetLanguageSaved } from './sharedByModules/hooks/useSetLanguageSaved'

function App() {
	useSetLanguageSaved()
	useUserPreffedLanguage()
	const defaultTheme = useUserSystemTheme()
	const [theme, setTheme] = useLocalStorage('boar-theme', defaultTheme)
	const [reminder, setReminder] = useLocalStorage('boar-reminder', blankReminder)

	return (
		<>
			<ThemeProvider theme={theme} changeTheme={setTheme}>
			<ReminderProvider reminderData={{ reminder, setReminder }}>
				<Router />
				<Toaster />
				<SonnerToaster />
			</ReminderProvider>
			</ThemeProvider>
		</>
	)
}

export default App
