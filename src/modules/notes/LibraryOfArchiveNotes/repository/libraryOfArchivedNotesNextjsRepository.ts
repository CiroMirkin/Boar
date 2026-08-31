import {
	defaultLibraryOfArchivedNotes,
	LibraryOfArchivedNotes,
} from '../model/libraryOfArchivedNotes'
import { LibraryOfArchiveNotesRepository } from '../model/libraryOfArchivedNotesRepository'
import { getArchivedNotes, saveArchivedNotes } from '@/actions/archive'

export default class LibraryOfArchivedNotesNextjsRepository
	implements LibraryOfArchiveNotesRepository
{
	async save(library: LibraryOfArchivedNotes, boardId: string): Promise<void> {
		await saveArchivedNotes({ boardId, notes: library })
	}

	async getAll(boardId: string): Promise<LibraryOfArchivedNotes> {
		const notes = await getArchivedNotes({ boardId })
		return notes ?? defaultLibraryOfArchivedNotes
	}
}
