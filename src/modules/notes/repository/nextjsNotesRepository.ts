import { defaultNotes, Notes } from '../model/notes'
import { NotesRepository } from './notesRepository'
import { getNotes, saveNotes } from '@/actions/notes'

export default class NextjsNotesRepository implements NotesRepository {
	async save(notes: Notes, boardId: string): Promise<void> {
		await saveNotes({ boardId, notes })
	}

	async getAll(boardId: string): Promise<Notes> {
		const notes = await getNotes({ boardId })
		return notes ?? defaultNotes
	}
}
