import { defaultLibraryOfArchivedNotes, LibraryOfArchivedNotes } from "../model/libraryOfArchivedNotes"

export default class LibraryOfArchivedNotesLocalStorageRepository implements LibraryOfArchivedNotesLocalStorageRepository {
    key
    constructor() {
        this.key = 'boar-archived-notes'
    }

    save(library: LibraryOfArchivedNotes): void {
        localStorage.setItem(this.key, JSON.stringify(library))
    }
    getAll(): LibraryOfArchivedNotes {
        return localStorage.getItem(this.key)
            ? JSON.parse(localStorage.getItem(this.key) as string)
            : defaultLibraryOfArchivedNotes
    }
}