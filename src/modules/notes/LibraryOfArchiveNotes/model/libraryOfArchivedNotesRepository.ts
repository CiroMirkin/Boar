import { LibraryOfArchivedNotes } from './libraryOfArchivedNotes'

export interface LibraryOfArchiveNotesRepository {
	save(notes: LibraryOfArchivedNotes, boardId: string): Promise<void>
	getAll(boardId: string): Promise<LibraryOfArchivedNotes>
}
