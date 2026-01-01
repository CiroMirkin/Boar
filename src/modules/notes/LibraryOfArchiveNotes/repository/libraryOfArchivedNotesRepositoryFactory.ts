import { Session } from '@supabase/supabase-js'
import { LibraryOfArchivedNotes } from '../model/libraryOfArchivedNotes'
import LibraryOfArchivedNotesLocalStorageRepository from './libraryOfArchivedNotesLocalStorageRepository'
import LibraryOfArchivedNotesSupabaseRepository from './libraryOfArchivedNotesSupabaseRepository'
import { LibraryOfArchiveNotesRepository } from '../model/libraryOfArchivedNotesRepository'
import { getActualBoardId } from '@/auth/utils/getActualBoardId'

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
	const boardId = getActualBoardId()
	const notes = await repository.getAll(boardId)
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
	const boardId = getActualBoardId()
	await repository.save(notes, boardId)
}
