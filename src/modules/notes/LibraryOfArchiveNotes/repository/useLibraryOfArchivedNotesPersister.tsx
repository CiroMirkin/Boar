import LibraryOfArchivedNotesSupabaseRepository from './libraryOfArchivedNotesSupabaseRepository'
import {
	defaultLibraryOfArchivedNotes,
	LibraryOfArchivedNotes,
} from '../model/libraryOfArchivedNotes'
import LibraryOfArchivedNotesLocalStorageRepository from './libraryOfArchivedNotesLocalStorageRepository'
import { SessionType } from '@/SessionProvider'

export const useLibraryOfArchivedNotesPersister = () => {
	/** Permite guardar las notas para que tengan persistencia (Supabase o LocalStorage). */
	const persistNotes = async (session: SessionType, notes: LibraryOfArchivedNotes) => {
		const localRepository = new LibraryOfArchivedNotesLocalStorageRepository()

		const areNotDefaultNotes =
			JSON.stringify(notes.archive) !== JSON.stringify(defaultLibraryOfArchivedNotes.archive)

		if (!areNotDefaultNotes) {
			return // No persistir notas por defecto
		}

		if (session) {
			const localNotes = await localRepository.getAll()
			const areNotLocalNotes =
				JSON.stringify(localNotes.archive) !== JSON.stringify(notes.archive)

			if (areNotLocalNotes) {
				await new LibraryOfArchivedNotesSupabaseRepository().save(notes)
				return
			}
		}

		await localRepository.save(notes)
	}

	return { persistNotes }
}
