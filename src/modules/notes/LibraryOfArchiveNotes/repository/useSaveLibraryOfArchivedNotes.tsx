import { SessionType } from "@/SessionProvider"
import { defaultLibraryOfArchivedNotes, LibraryOfArchivedNotes } from "../model/libraryOfArchivedNotes"
import LibraryOfArchivedNotesLocalStorageRepository from "./libraryOfArchivedNotesLocalStorageRepository"
import LibraryOfArchivedNotesSupabaseRepository from "./libraryOfArchivedNotesSupabaseRepository"


interface useSaveLibraryOfArchivedNotesParams {
    notes: LibraryOfArchivedNotes
    session: SessionType
}

export const useSaveLibraryOfArchivedNotes = ({ notes, session }: useSaveLibraryOfArchivedNotesParams) => {
    if(!!session) {
        new LibraryOfArchivedNotesSupabaseRepository().save(notes)
    } 
    else if(notes !== defaultLibraryOfArchivedNotes) {
        new LibraryOfArchivedNotesLocalStorageRepository().save(notes)
    }
}