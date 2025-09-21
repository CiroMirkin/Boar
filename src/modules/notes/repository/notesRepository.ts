import { Notes } from './notes'

export interface NotesRepository {
	save(notes: Notes): void
	getAll(): Notes
}
