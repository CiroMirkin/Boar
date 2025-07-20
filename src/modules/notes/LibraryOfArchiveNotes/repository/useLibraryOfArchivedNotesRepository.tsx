import LibraryOfArchivedNotesSupabaseRepository from "./libraryOfArchivedNotesSupabaseRepository";
import { defaultLibraryOfArchivedNotes, LibraryOfArchivedNotes } from "../model/libraryOfArchivedNotes";
import LibraryOfArchivedNotesLocalStorageRepository from "./libraryOfArchivedNotesLocalStorageRepository";
import { SessionType } from "@/SessionProvider";
import { Dispatch } from "@reduxjs/toolkit";
import { setArchivedNotes } from "../state/archivedNotesReducer";

export const useLibraryOfArchivedNotesRepository = (notes: LibraryOfArchivedNotes) => ({
    set: (session: SessionType, dispatch: Dispatch) => set({ session, dispatch }),
    send: (session: SessionType) => send({ session, notes })
})

interface SetParams { session: SessionType, dispatch: Dispatch }
/** Permite obtener los datos desde el repositorio donde se almacenan y establecerlos localmente en la aplicación. */
const set = async ({ session, dispatch }: SetParams) => {
    if(!!session) {
        const notes = await new LibraryOfArchivedNotesSupabaseRepository().getAll()
        dispatch(setArchivedNotes(notes))
        return;
    }
    const notes = await new LibraryOfArchivedNotesLocalStorageRepository().getAll()
    if(JSON.stringify(notes.archive) !== JSON.stringify(defaultLibraryOfArchivedNotes.archive)) {
        dispatch(setArchivedNotes(notes))
    }
}

interface SendParams { session: SessionType, notes: LibraryOfArchivedNotes }
/** Permite guardar las notas para que tengan persistencia (Supabase o LocalStorage). */
const send = async ({ session, notes }: SendParams) => {
    const lg = new LibraryOfArchivedNotesLocalStorageRepository()

    const areNotTheDefaultNotes = JSON.stringify(notes.archive) !== JSON.stringify(defaultLibraryOfArchivedNotes.archive)
    const localNotes = JSON.stringify((await lg.getAll()).archive)
    const areNoteTheLocalNotes = localNotes !== JSON.stringify(notes.archive)
    if(areNotTheDefaultNotes) {
        if(!!session && areNoteTheLocalNotes) {
            await new LibraryOfArchivedNotesSupabaseRepository().save(notes)
            return;
        }
        await lg.save(notes)
    }
}