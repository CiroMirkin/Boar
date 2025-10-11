import './App.css'
import Router from './Router'
import { Toaster as SonnerToaster } from 'sonner'
import './i18next/index'
import { useUserPreffedLanguage } from './modules/LanguageToggle/useUserPreffedLanguage'
import { ThemeProvider } from './modules/Theme/ThemeContext'
import { useLocalStorage } from '@uidotdev/usehooks'
import { useUserSystemTheme } from './modules/Theme/useUserSystemTheme'
import { useSetLanguageSaved } from './modules/LanguageToggle/useSetLanguageSaved'
import { useSession } from './auth/hooks/useSession'
import { useDispatch } from 'react-redux'

import { useSyncUserBoard } from './auth/hooks/useSyncUserBoard'
import { useGetUserArchiveFromSupabase } from './modules/taskList/ArchivedTasks/state/useGetUserArchiveFromSupabase'
import { useLibraryOfArchivedNotesLoader } from './modules/notes/LibraryOfArchiveNotes/hooks/useLibraryOfArchivedNotesLoader'
import { useEffect } from 'react'

function App() {
	useSetLanguageSaved()
	useUserPreffedLanguage()
	const defaultTheme = useUserSystemTheme()
	const [theme, setTheme] = useLocalStorage('boar-theme', defaultTheme)

	const dispatch = useDispatch()
	const { session } = useSession()

	useSyncUserBoard()
	useGetUserArchiveFromSupabase(session)
	const { loadAndSetNotes } = useLibraryOfArchivedNotesLoader()
	useEffect(() => {
		loadAndSetNotes(session, dispatch)
	}, [session, dispatch, loadAndSetNotes])

	return (
		<>
			<ThemeProvider theme={theme} changeTheme={setTheme}>
				<Router />
				<SonnerToaster position='top-center' richColors closeButton />
			</ThemeProvider>
		</>
	)
}

export default App
