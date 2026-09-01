import { defaultNotes, Notes } from '../model/notes'
import { NotesRepository } from './notesRepository'

export default class NextjsNotesRepository implements NotesRepository {
	async save(notes: Notes, boardId: string): Promise<void> {
		const { saveNotes } = await import('@/actions/notes')
		await saveNotes({ boardId, notes })
	}

	async getAll(boardId: string): Promise<Notes> {
		const { getNotes } = await import('@/actions/notes')
		const notes = await getNotes({ boardId })
		return notes ?? defaultNotes
	}
}
