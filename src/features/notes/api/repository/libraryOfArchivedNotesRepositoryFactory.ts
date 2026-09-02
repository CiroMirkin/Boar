import type { SessionType } from '@/auth/contexts/SessionProvider'
import { LibraryOfArchivedNotes } from '../../model/libraryOfArchivedNotes'
import LibraryOfArchivedNotesLocalStorageRepository from './libraryOfArchivedNotesLocalStorageRepository'
import LibraryOfArchivedNotesNextjsRepository from './libraryOfArchivedNotesNextjsRepository'
import { LibraryOfArchiveNotesRepository } from './libraryOfArchivedNotesRepository'

export const libraryOfArchivedNotesRepositoryFactory = (
	session: SessionType
): LibraryOfArchiveNotesRepository => {
	if (session) {
		return new LibraryOfArchivedNotesNextjsRepository()
	}
	return new LibraryOfArchivedNotesLocalStorageRepository()
}

export const fetchLibraryOfArchivedNotes = async (
	session: SessionType,
	boardId: string
): Promise<LibraryOfArchivedNotes> => {
	const repository = libraryOfArchivedNotesRepositoryFactory(session)
	return repository.getAll(boardId)
}

export const saveLibraryOfArchivedNotes = async ({
	notes,
	session,
	boardId,
}: {
	notes: LibraryOfArchivedNotes
	session: SessionType
	boardId: string
}): Promise<void> => {
	const repository = libraryOfArchivedNotesRepositoryFactory(session)
	await repository.save(notes, boardId)
}
