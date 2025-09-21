import { SessionType } from '@/auth/contexts/SessionProvider'
import { sendForSaveNotes } from './sendForSaveNotes'
import { defaultNotes, Notes } from '../model/notes'
import LocalStorageNotesRepository from './LocalStorageNotesRepository'

interface SaveNotesParams {
	notes: Notes
	session: SessionType
	emptyNote?: boolean
}

export const saveNotes = async ({ notes, session, emptyNote = false }: SaveNotesParams) => {
	if (session) {
		await sendForSaveNotes({ notes })
	} else if (notes !== defaultNotes || emptyNote) {
		new LocalStorageNotesRepository().save(notes)
	}
}
