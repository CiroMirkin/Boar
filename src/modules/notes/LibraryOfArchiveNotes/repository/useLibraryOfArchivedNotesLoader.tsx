import LibraryOfArchivedNotesSupabaseRepository from './libraryOfArchivedNotesSupabaseRepository'
import { defaultLibraryOfArchivedNotes } from '../model/libraryOfArchivedNotes'
import LibraryOfArchivedNotesLocalStorageRepository from './libraryOfArchivedNotesLocalStorageRepository'
import { SessionType } from '@/auth/contexts/SessionProvider'
import { Dispatch } from '@reduxjs/toolkit'
import { setArchivedNotes } from '../state/archivedNotesReducer'

export const useLibraryOfArchivedNotesLoader = () => {
	/** Permite obtener los datos desde el repositorio donde se almacenan y establecerlos localmente en la aplicación. */
	const loadAndSetNotes = async (session: SessionType, dispatch: Dispatch) => {
		if (session) {
			const notes = await new LibraryOfArchivedNotesSupabaseRepository().getAll()
			dispatch(setArchivedNotes(notes))
			return
		}

		const notes = await new LibraryOfArchivedNotesLocalStorageRepository().getAll()
		const isNotDefault =
			JSON.stringify(notes.archive) !== JSON.stringify(defaultLibraryOfArchivedNotes.archive)

		if (isNotDefault) {
			dispatch(setArchivedNotes(notes))
		}
	}

	return { loadAndSetNotes }
}
