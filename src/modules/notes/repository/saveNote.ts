import { SessionType } from '@/auth/contexts/SessionProvider'
import { defaultNotes, Notes } from '../model/notes'
import LocalStorageNotesRepository from './LocalStorageNotesRepository'
import SupabaseNotesRepository from './SupabaseNotesRepository'

interface SaveNotesParams {
	notes: Notes
	session: SessionType
	emptyNote?: boolean
}

export const saveNotes = async ({ notes, session, emptyNote = false }: SaveNotesParams) => {
	if (session) {
		const supabseNotes = new SupabaseNotesRepository()
		await supabseNotes.save(notes)
	} else if (notes !== defaultNotes || emptyNote) {
		new LocalStorageNotesRepository().save(notes)
	}
}
