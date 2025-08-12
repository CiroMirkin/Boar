import './App.css'
import Router from './Router'
import { Toaster as SonnerToaster } from 'sonner'
import './i18next/index'
import { useUserPreffedLanguage } from './sharedByModules/hooks/useUserPreffedLanguage'
import { ThemeContext, ThemeProvider } from './modules/Theme/ThemeContext'
import { useLocalStorage } from '@uidotdev/usehooks'
import { blankReminder } from './modules/taskList/Reminder/reminder'
import { ReminderProvider } from './modules/taskList/Reminder/ReminderContext'
import { useUserSystemTheme } from './modules/Theme/useUserSystemTheme'
import { useSetLanguageSaved } from './modules/LanguageToggle/useSetLanguageSaved'
import { useContext, useEffect } from 'react'
import { useSyncUserBoard } from './sharedByModules/hooks/useSyncUserBoard'
import { useSession } from './SessionProvider'
import { useDispatch } from 'react-redux'
import { useGetUserArchiveFromSupabase } from './modules/taskList/ArchivedTasks/state/useGetUserArchiveFromSupabase'
import { setTheUserBoardSavedInLocalStorage } from './sharedByModules/utils/setTheUserBoardSavedInLocalStorage'
import { useLibraryOfArchivedNotesRepository } from './modules/notes/LibraryOfArchiveNotes/repository/useLibraryOfArchivedNotesRepository'
import { useLibraryOfArchivedNotes } from './modules/notes/LibraryOfArchiveNotes/state/useLibraryOfArchivedNotes'
import { NoteProvider } from './modules/notes/NoteProvider'

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
				<NoteProvider>
					<Router />
				</NoteProvider>
				<SonnerToaster position="top-center" richColors closeButton  />
			</ReminderProvider>
			</ThemeProvider>
		</>
	)
}

export default App
