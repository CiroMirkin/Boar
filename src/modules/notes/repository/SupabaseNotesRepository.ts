import { defaultNotes, Notes } from '../model/notes'
import { NotesRepository } from './notesRepository'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'

export default class SupabaseNotesRepository implements NotesRepository {
	async save(notes: Notes, boardId: string) {
		if (!isSupabaseConfigured || !supabase) return

		const { error } = await supabase
			.from('board_accessories')
			.update({ notes })
			.eq('id', boardId)

		if (error) throw error
	}
	async getAll(boardId: string) {
		if (!isSupabaseConfigured || !supabase) return defaultNotes

		const { data, error } = await supabase
			.from('board_accessories')
			.select('notes')
			.eq('id', boardId)

		if (error) throw error

		const notes = data[0].notes
		return notes ? notes : defaultNotes
	}
}
