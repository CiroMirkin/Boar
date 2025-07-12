import { LibraryOfArchivedNotes } from "./libraryOfArchivedNotes"

export interface LibraryOfArchiveNotesRepository {
    save(notes: LibraryOfArchivedNotes): void
    getAll(): LibraryOfArchivedNotes
}