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
import { useEffect, useRef } from 'react'
import { useSyncUserBoard } from './sharedByModules/hooks/useSyncUserBoard'
import { useSession } from './SessionProvider'
import { useDispatch } from 'react-redux'
import { useSyncArchive } from './modules/taskList/archive/state/useSyncArchive'
import { saveUserBoardInLocalStorage as setTheUserBoardSavedInLocalStorage } from './sharedByModules/utils/setTheUserBoardSavedInLocalStorage'

function App() {
	useSetLanguageSaved()
	useUserPreffedLanguage()
	const defaultTheme = useUserSystemTheme()
	const [theme, setTheme] = useLocalStorage('boar-theme', defaultTheme)
	const [reminder, setReminder] = useLocalStorage('boar-reminder', blankReminder)
	
	const dispatch = useDispatch()
	const isUserBoardSynchronizedRef = useRef<boolean>(false) 
	const { session } = useSession()
	useEffect(() => {
		// Si el usuario NO esta sincronizado o cambio el estado de la session
		if(!isUserBoardSynchronizedRef.current || !!session) {
			isUserBoardSynchronizedRef.current = true
			useSyncUserBoard(dispatch)
			useSyncArchive(dispatch)
		}
		else {
			setTheUserBoardSavedInLocalStorage(dispatch)
		}
	}, [session])

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
