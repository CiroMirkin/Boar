import { SessionType } from "@/SessionProvider"
import { sendForSaveNotes } from "./sendForSaveNotes"
import { Notes } from "./domain/notes"

interface useSaveBoardParams {
    notes: Notes
    session: SessionType
}

export const useSaveNotes = ({ notes, session }: useSaveBoardParams) => {
    const localStorage = window.localStorage.getItem('boar-notes')
    
    if(!!session) {
        sendForSaveNotes({ notes })
    } 
    else if(localStorage != null) {
        if(notes !== '') {       
            window.localStorage.setItem('boar-notes', JSON.stringify({ notes }))
        }
    }
}