import './App.css'
import Router from './Router'
import { Toaster } from './ui/toaster'
import { Toaster as SonnerToaster } from 'sonner'
import './i18next/index'
import { useUserPreffedLanguage } from './sharedByModules/hooks/useUserPreffedLanguage'
import { ThemeContext, ThemeProvider } from './modules/Theme/ThemeContext'
import { useLocalStorage } from '@uidotdev/usehooks'
import { blankReminder } from './modules/taskList/Reminder/reminder'
import { ReminderProvider } from './modules/taskList/Reminder/ReminderContext'
import { useUserSystemTheme } from './modules/Theme/useUserSystemTheme'
import { useSetLanguageSaved } from './sharedByModules/hooks/useSetLanguageSaved'
import { useContext, useEffect } from 'react'
import { useSyncUserBoard } from './sharedByModules/hooks/useSyncUserBoard'
import { useSession } from './SessionProvider'
import { useDispatch } from 'react-redux'
import { useGetUserArchiveFromSupabase } from './modules/taskList/archive/state/useGetUserArchiveFromSupabase'
import { setTheUserBoardSavedInLocalStorage } from './sharedByModules/utils/setTheUserBoardSavedInLocalStorage'
import { useLibraryOfArchivedNotesRepository } from './modules/notes/LibraryOfArchiveNotes/repository/useLibraryOfArchivedNotesRepository'
import { useLibraryOfArchivedNotes } from './modules/notes/LibraryOfArchiveNotes/state/useLibraryOfArchivedNotes'

export const useTheme = () => useContext(ThemeContext).theme

function App() {
	useSetLanguageSaved()
	useUserPreffedLanguage()
	const defaultTheme = useUserSystemTheme()
	const [theme, setTheme] = useLocalStorage('boar-theme', defaultTheme)
	const [reminder, setReminder] = useLocalStorage('boar-reminder', blankReminder)
	
	const dispatch = useDispatch()
	const { session } = useSession()
	const libraryOfArchivedNotes = useLibraryOfArchivedNotes()
	// Si el usuario NO esta sincronizado o cambio el estado de la session
	useEffect(() => {
		useLibraryOfArchivedNotesRepository(libraryOfArchivedNotes).set(session, dispatch)
		
		if(!!session) {
			useSyncUserBoard(dispatch)
			useGetUserArchiveFromSupabase(dispatch)
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
				<SonnerToaster position="top-center" richColors />
			</ReminderProvider>
			</ThemeProvider>
		</>
	)
}

export default App
