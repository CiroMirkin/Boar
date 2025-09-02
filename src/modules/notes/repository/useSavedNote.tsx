import { SessionType } from '@/SessionProvider'
import { sendForSaveNotes } from './sendForSaveNotes'
import { defaultNotes, Notes } from '../model/notes'
import LocalStorageNotesRepository from './LocalStorageNotesRepository'

interface useSaveBoardParams {
	notes: Notes
	session: SessionType
	emptyNote?: boolean
}

export const useSaveNotes = async ({ notes, session, emptyNote = false }: useSaveBoardParams) => {
	if (session) {
		await sendForSaveNotes({ notes })
	} else if (notes !== defaultNotes || emptyNote) {
		new LocalStorageNotesRepository().save(notes)
	}
}
