import { defaultNotes, Notes } from '../model/notes'
import { NotesRepository } from '../model/notesRepository'

export default class LocalStorageNotesRepository implements NotesRepository {
	key
	constructor() {
		this.key = 'boar-notes'
	}
	save(notes: Notes): void {
		const notesForSave = { notes }
		localStorage.setItem(this.key, JSON.stringify(notesForSave))
	}
	getAll(): Notes {
		return localStorage.getItem(this.key)
			? JSON.parse(localStorage.getItem(this.key) as string).notes
			: defaultNotes
	}
}
