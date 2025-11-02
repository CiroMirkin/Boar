import { Session } from '@supabase/supabase-js'
import { LibraryOfArchivedNotes } from '../model/libraryOfArchivedNotes'
import LibraryOfArchivedNotesLocalStorageRepository from './libraryOfArchivedNotesLocalStorageRepository'
import LibraryOfArchivedNotesSupabaseRepository from './libraryOfArchivedNotesSupabaseRepository'
import { LibraryOfArchiveNotesRepository } from '../model/libraryOfArchivedNotesRepository'

export const libraryOfArchivedNotesRepositoryFactory = (
	session: Session | null
): LibraryOfArchiveNotesRepository => {
	if (session) {
		return new LibraryOfArchivedNotesSupabaseRepository()
	}
	return new LibraryOfArchivedNotesLocalStorageRepository()
}

export const fetchLibraryOfArchivedNotes = async (
	session: Session | null
): Promise<LibraryOfArchivedNotes> => {
	const repository = libraryOfArchivedNotesRepositoryFactory(session)
	const notes = await repository.getAll()
	return notes
}

export const saveLibraryOfArchivedNotes = async ({
	notes,
	session,
}: {
	notes: LibraryOfArchivedNotes
	session: Session | null
}): Promise<void> => {
	const repository = libraryOfArchivedNotesRepositoryFactory(session)
	await repository.save(notes)
}
