import type { SessionType } from '@/auth/contexts/SessionProvider'
import { Notes } from '../../model/notes'
import LocalStorageNotesRepository from './LocalStorageNotesRepository'
import { NotesRepository } from './notesRepository'
import NextjsNotesRepository from './nextjsNotesRepository'

export const notesRepositoryFactory = (session: SessionType): NotesRepository => {
	if (session) {
		return new NextjsNotesRepository()
	}
	return new LocalStorageNotesRepository()
}

export const fetchNotes = async (session: SessionType, boardId: string): Promise<Notes> => {
	const repository = notesRepositoryFactory(session)
	return repository.getAll(boardId)
}

export const saveNotes = async ({
	notes,
	session,
	boardId,
}: {
	notes: Notes
	session: SessionType
	boardId: string
}): Promise<void> => {
	const repository = notesRepositoryFactory(session)
	await repository.save(notes, boardId)
}
