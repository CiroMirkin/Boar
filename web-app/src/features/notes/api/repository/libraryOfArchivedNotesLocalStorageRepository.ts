import {
	defaultLibraryOfArchivedNotes,
	LibraryOfArchivedNotes,
} from '../../model/libraryOfArchivedNotes'
import { LibraryOfArchiveNotesRepository } from './libraryOfArchivedNotesRepository'

export default class LibraryOfArchivedNotesLocalStorageRepository
	implements LibraryOfArchiveNotesRepository
{
	key
	constructor() {
		this.key = 'capo-archived-notes'
	}

	async save(library: LibraryOfArchivedNotes): Promise<void> {
		localStorage.setItem(this.key, JSON.stringify(library))
	}
	async getAll(): Promise<LibraryOfArchivedNotes> {
		return localStorage.getItem(this.key)
			? JSON.parse(localStorage.getItem(this.key) as string)
			: defaultLibraryOfArchivedNotes
	}
}
