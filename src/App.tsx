import './App.css'
import Router from './Router'
import { Toaster } from './ui/toaster'
import './i18next/index'
import { useUserPreffedLanguage } from './modules/shared/hooks/useUserPreffedLanguage'
import { ThemeProvider } from './modules/shared/Theme/ThemeContext'
import { useLocalStorage } from '@uidotdev/usehooks'
import { blankReminder } from './modules/taskList/Reminder/reminder'
import { ReminderProvider } from './modules/taskList/Reminder/ReminderContext'
import { useUserSystemTheme } from './modules/shared/Theme/useUserSystemTheme'

function App() {
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
			</ReminderProvider>
			</ThemeProvider>
		</>
	)
}

export default App
