import { LibraryOfArchivedNotes } from '../model/libraryOfArchivedNotes'

export interface LibraryOfArchiveNotesRepository {
	save(notes: LibraryOfArchivedNotes, boardId: string): Promise<void>
	getAll(boardId: string): Promise<LibraryOfArchivedNotes>
}
