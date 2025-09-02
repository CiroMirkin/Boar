import './App.css'
import Router from './Router'
import { Toaster as SonnerToaster } from 'sonner'
import './i18next/index'
import { useUserPreffedLanguage } from './modules/LanguageToggle/useUserPreffedLanguage'
import { ThemeProvider } from './modules/Theme/ThemeContext'
import { useLocalStorage } from '@uidotdev/usehooks'
import { blankReminder } from './modules/taskList/Reminder/reminder'
import { ReminderProvider } from './modules/taskList/Reminder/ReminderContext'
import { useUserSystemTheme } from './modules/Theme/useUserSystemTheme'
import { useSetLanguageSaved } from './modules/LanguageToggle/useSetLanguageSaved'
import { useSession } from './SessionProvider'
import { useDispatch } from 'react-redux'
import { NoteProvider } from './modules/notes/NoteProvider'
import { useSavedUserBoardInLocalStorage } from './sharedByModules/utils/useSavedUserBoardInLocalStorage'
import { useGetUserArchiveFromSupabase } from './modules/taskList/ArchivedTasks/state/useGetUserArchiveFromSupabase'
import { useLibraryOfArchivedNotesLoader } from './modules/notes/LibraryOfArchiveNotes/repository/useLibraryOfArchivedNotesLoader'
import { useEffect } from 'react'

function App() {
	useSetLanguageSaved()
	useUserPreffedLanguage()
	const defaultTheme = useUserSystemTheme()
	const [theme, setTheme] = useLocalStorage('boar-theme', defaultTheme)
	const [reminder, setReminder] = useLocalStorage('boar-reminder', blankReminder)

	const dispatch = useDispatch()
	const { session } = useSession()
	useSavedUserBoardInLocalStorage(dispatch, session)
	useGetUserArchiveFromSupabase(session)
	const { loadAndSetNotes } = useLibraryOfArchivedNotesLoader()
	useEffect(() => {
		loadAndSetNotes(session, dispatch)
	},[session, dispatch, loadAndSetNotes])

	return (
		<>
			<ThemeProvider theme={theme} changeTheme={setTheme}>
				<ReminderProvider reminderData={{ reminder, setReminder }}>
					<NoteProvider>
						<Router />
					</NoteProvider>
					<SonnerToaster position='top-center' richColors closeButton />
				</ReminderProvider>
			</ThemeProvider>
		</>
	)
}

export default App
