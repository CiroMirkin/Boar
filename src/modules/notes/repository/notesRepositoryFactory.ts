import { SessionType } from '@/auth/contexts/SessionProvider'
import LocalStorageNotesRepository from './LocalStorageNotesRepository'
import { NotesRepository } from './notesRepository'
import SupabaseNotesRepository from './SupabaseNotesRepository'

export const notesRepositoryFactory = (session: SessionType): NotesRepository => {
	if (session) {
		return new SupabaseNotesRepository()
	}
	return new LocalStorageNotesRepository()
}
