import {
	defaultLibraryOfArchivedNotes,
	LibraryOfArchivedNotes,
} from '../model/libraryOfArchivedNotes'
import { LibraryOfArchiveNotesRepository } from './libraryOfArchivedNotesRepository'

export default class LibraryOfArchivedNotesNextjsRepository
	implements LibraryOfArchiveNotesRepository
{
	async save(library: LibraryOfArchivedNotes, boardId: string): Promise<void> {
		const { saveArchivedNotes } = await import('./saveArchivedNotes')
		await saveArchivedNotes({ boardId, notes: library })
	}

	async getAll(boardId: string): Promise<LibraryOfArchivedNotes> {
		const { getArchivedNotes } = await import('./getArchivedNotes')
		const notes = await getArchivedNotes({ boardId })
		return notes ?? defaultLibraryOfArchivedNotes
	}
}
