import { Notes } from '../model/notes'

export interface NotesRepository {
	save(notes: Notes): Promise<void>
	getAll(): Promise<Notes>
}
