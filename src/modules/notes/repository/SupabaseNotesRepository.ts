import { getUserId } from '@/auth/utils/getUserId'
import { defaultNotes, Notes } from '../model/notes'
import { NotesRepository } from './notesRepository'
import { supabase } from '@/lib/supabase'

export default class SupabaseNotesRepository implements NotesRepository {
	constructor() {}
	async save(notes: Notes) {
		const user_id = await getUserId()
		const { error } = await supabase.from('boards').update({ notes }).eq('user_id', user_id)

		if (error) throw error
	}
	async getAll() {
		const user_id = await getUserId()
		const { data, error } = await supabase.from('boards').select('notes').eq('user_id', user_id)

		if (error) throw error

		const notes = data[0].notes
		return notes ? notes : defaultNotes
	}
}
