import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useLibraryOfArchivedNotes } from "../LibraryOfArchiveNotes/state/useLibraryOfArchivedNotes"
import { useSession } from "@/SessionProvider"
import { useLibraryOfArchivedNotesRepository } from "../LibraryOfArchiveNotes/repository/useLibraryOfArchivedNotesRepository"
import { useSaveNotes } from "../repository/useSavedNote"
import { useDispatch } from "react-redux"
import { archiveThisNote } from "../LibraryOfArchiveNotes/state/archivedNotesReducer"
import { useNote } from "../NoteProvider"
import { defaultNotes } from "../model/notes"
import { toast } from "sonner"
import { Button } from "@/ui/atoms/button"
import { ArchiveIcon } from "@/ui/icons"

export function ArchiveNoteBtn() {
    const [ taskArchived, setTaskArchived ] = useState(false)
    const { note, setNote } = useNote()
    const { t } = useTranslation()

    const libraryOfArchivedNotes = useLibraryOfArchivedNotes()
    const { session } = useSession()
    useEffect(() => {
        if(note == '' || note == "<br>") {
            if(taskArchived) {
                useLibraryOfArchivedNotesRepository(libraryOfArchivedNotes).send(session)
                useSaveNotes({ notes: note, session, emptyNote: true })
                setTaskArchived(false)
            }
        }
    }, [libraryOfArchivedNotes])

    const dispatch = useDispatch()
    const handleArchiveNote = () => {
        dispatch(archiveThisNote(note))
        setNote(defaultNotes)
        setTaskArchived(true)
        toast.success(t('archived_note.archive_successful_toast'))
    }
    
    return (
        <Button 
            variant='ghost'
            onClick={handleArchiveNote}
        >
            <ArchiveIcon className='mr-2' />
            { t('archived_note.archive_note_btn') }
        </Button>
    )
}