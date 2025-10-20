import { defaultNotes, Notes } from '../model/notes'
import { NotesRepository } from './notesRepository'

export default class LocalStorageNotesRepository implements NotesRepository {
	key
	constructor() {
		this.key = 'boar-notes'
	}
	async save(notes: Notes): Promise<void> {
		const notesForSave = { notes }
		localStorage.setItem(this.key, JSON.stringify(notesForSave))
	}
	async getAll(): Promise<Notes> {
		return localStorage.getItem(this.key)
			? JSON.parse(localStorage.getItem(this.key) as string).notes
			: defaultNotes
	}
}
