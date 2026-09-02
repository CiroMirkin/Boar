import {
	defaultLibraryOfArchivedNotes,
	LibraryOfArchivedNotes,
} from '../../model/libraryOfArchivedNotes'
import { LibraryOfArchiveNotesRepository } from './libraryOfArchivedNotesRepository'

export default class LibraryOfArchivedNotesNextjsRepository
	implements LibraryOfArchiveNotesRepository
{
	async save(library: LibraryOfArchivedNotes, boardId: string): Promise<void> {
		const { saveArchivedNotes } = await import('../actions/saveArchivedNotes')
		await saveArchivedNotes({ boardId, notes: library })
	}

	async getAll(boardId: string): Promise<LibraryOfArchivedNotes> {
		const { getArchivedNotes } = await import('../actions/getArchivedNotes')
		const notes = await getArchivedNotes({ boardId })
		return notes ?? defaultLibraryOfArchivedNotes
	}
}
