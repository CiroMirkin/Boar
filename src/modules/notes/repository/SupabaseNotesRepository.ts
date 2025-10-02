import { getActualBoardId } from '@/auth/utils/getActualBoardId'
import { defaultNotes, Notes } from '../model/notes'
import { NotesRepository } from './notesRepository'
import { supabase } from '@/lib/supabase'

export default class SupabaseNotesRepository implements NotesRepository {
	constructor() {}
	async save(notes: Notes) {
		const { error } = await supabase
			.from('board_accessories')
			.update({ notes })
			.eq('id', getActualBoardId())

		if (error) throw error
	}
	async getAll() {
		const { data, error } = await supabase
			.from('board_accessories')
			.select('notes')
			.eq('id', getActualBoardId())

		if (error) throw error

		const notes = data[0].notes
		return notes ? notes : defaultNotes
	}
}
