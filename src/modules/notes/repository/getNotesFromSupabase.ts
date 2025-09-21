import { Dispatch, SetStateAction } from 'react'
import SupabaseNotesRepository from './SupabaseNotesRepository'

interface getNotesFromSupabaseParams {
	setNotes: Dispatch<SetStateAction<string>>
}

export const getNotesFromSupabase = async ({ setNotes }: getNotesFromSupabaseParams) => {
	const supabaseNotes = new SupabaseNotesRepository()
	const notes = await supabaseNotes.getAll()
	setNotes(notes)
}
