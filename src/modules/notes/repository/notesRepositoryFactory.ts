import { Session } from '@supabase/supabase-js'
import { Notes } from '../model/notes'
import LocalStorageNotesRepository from './LocalStorageNotesRepository'
import { NotesRepository } from './notesRepository'
import SupabaseNotesRepository from './SupabaseNotesRepository'
import { getActualBoardId } from '@/auth/utils/getActualBoardId'

export const notesRepositoryFactory = (session: Session | null): NotesRepository => {
	if (session) {
		return new SupabaseNotesRepository()
	}
	return new LocalStorageNotesRepository()
}

export const fetchNotes = async (session: Session | null): Promise<Notes> => {
	const repository = notesRepositoryFactory(session)
	const boardId = getActualBoardId()
	const notes = await repository.getAll(boardId)
	return notes
}

export const saveNotes = async ({
	notes,
	session,
}: {
	notes: Notes
	session: Session | null
}): Promise<void> => {
	const repository = notesRepositoryFactory(session)
	const boardId = getActualBoardId()
	await repository.save(notes, boardId)
}
