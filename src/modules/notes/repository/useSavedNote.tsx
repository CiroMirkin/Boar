import { SessionType } from "@/SessionProvider"
import { sendForSaveNotes } from "./sendForSaveNotes"
import { defaultNotes, Notes } from "../domain/notes"
import LocalStorageNotesRepository from "./LocalStorageNotesRepository"

interface useSaveBoardParams {
    notes: Notes
    session: SessionType
}

export const useSaveNotes = ({ notes, session }: useSaveBoardParams) => {
    const notesFromLocalStorage = new LocalStorageNotesRepository().getAll()
    
    if(!!session) {
        sendForSaveNotes({ notes })
    } 
    else if(notesFromLocalStorage != defaultNotes && notes !== defaultNotes) {
        new LocalStorageNotesRepository().save(notes)
    }
}