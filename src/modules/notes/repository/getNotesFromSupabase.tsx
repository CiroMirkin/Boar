import { supabase } from '@/lib/supabase'
import { Dispatch, SetStateAction } from 'react'

interface getNotesFromSupabaseParams {
	setNotes: Dispatch<SetStateAction<string>>
}

export const getNotesFromSupabase = async ({ setNotes }: getNotesFromSupabaseParams) => {
	const { data } = await supabase.from('boards').select('notes')

	if (data != null) {
		const notes: string = data[0].notes
		setNotes(notes)
	}
}
