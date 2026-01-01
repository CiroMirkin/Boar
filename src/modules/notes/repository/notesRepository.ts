import { Notes } from '../model/notes'

export interface NotesRepository {
	save(notes: Notes, boardId: string): Promise<void>
	getAll(boardId: string): Promise<Notes>
}
