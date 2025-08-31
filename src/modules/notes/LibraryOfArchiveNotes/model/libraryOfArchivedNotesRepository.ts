import { LibraryOfArchivedNotes } from './libraryOfArchivedNotes'

export interface LibraryOfArchiveNotesRepository {
	save(notes: LibraryOfArchivedNotes): Promise<void>
	getAll(): Promise<LibraryOfArchivedNotes>
}
