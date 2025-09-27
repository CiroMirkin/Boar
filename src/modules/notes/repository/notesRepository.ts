import { Notes } from '../model/notes'

export interface NotesRepository {
	save(notes: Notes): void
	getAll(): Promise<Notes>
}
