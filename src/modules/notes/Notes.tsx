import { Button } from "@/ui/button";
import { ScrollArea } from "@/ui/scroll-area";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/ui/sheet";
import { toast } from "sonner"
import { useSaveNotes } from "./repository/useSavedNote";
import { useSession } from "@/SessionProvider";
import { useEffect, useState } from "react";
import { getNotesFromSupabase } from "./repository/getNotesFromSupabase";
import { defaultNotes, maxLengthOfNotes, Notes as NotesModel } from "./model/notes";
import LocalStorageNotesRepository from "./repository/LocalStorageNotesRepository";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/App";
import RichTextEditor from "./RichTextEditor/RichTextEditor";
import { useDispatch } from "react-redux";
import { archiveThisNote } from "./LibraryOfArchiveNotes/state/archivedNotesReducer";
import { useLibraryOfArchivedNotesRepository } from "./LibraryOfArchiveNotes/repository/useLibraryOfArchivedNotesRepository";
import { useLibraryOfArchivedNotes } from "./LibraryOfArchiveNotes/state/useLibraryOfArchivedNotes";
import { ArchiveIcon } from "@/ui/icons";

export default function Notes() {
    const [text, setText] = useState(defaultNotes as NotesModel)
    const [ taskArchived, setTaskArchived ] = useState(false)
    const { t } = useTranslation()
    const { session } = useSession()

    useEffect(() => {
        if(!!session) {
            getNotesFromSupabase({ setNotes: setText })
        }
        else {
            const lg = new LocalStorageNotesRepository()
            const notesFromLocalStotage = lg.getAll()
            notesFromLocalStotage == defaultNotes 
                ? lg.save(text) 
                : setText(notesFromLocalStotage)
        }
    }, [session])

    const libraryOfArchivedNotes = useLibraryOfArchivedNotes()
    useEffect(() => {
        if(text == '' || text == "<br>") {
            if(taskArchived) {
                useLibraryOfArchivedNotesRepository(libraryOfArchivedNotes).send(session)
                useSaveNotes({ notes: text, session, emptyNote: true })
                setTaskArchived(false)
            }
        }
    }, [libraryOfArchivedNotes])

    const onChange = (newText: NotesModel) => {
        if(newText.trim().length <= maxLengthOfNotes) {
            setText(newText)
            return;
        }

        toast.error(t('notes.warning_length_toast'))
    }

    const handleSaveNotes = () => {
        useSaveNotes({ session, notes: text })
        toast.success(t('notes.successful_toast'))
    }

    const dispatch = useDispatch()
    const handleArchiveNote = () => {
        dispatch(archiveThisNote(text))
        setText(defaultNotes)
        setTaskArchived(true)
        toast.success(t('archived_note.archive_successful_toast'))
    }

    const { column, text: textColor } = useTheme()

    return (
        <Sheet onOpenChange={(isOpen) => !isOpen && handleSaveNotes()}>
            <SheetTrigger asChild>
                <Button variant='link' className={`text-base ${textColor}`}>{ t('notes.action_title') }</Button>
            </SheetTrigger>
            <SheetContent className={column}>
                <SheetHeader>
                    <SheetTitle className={textColor}>{ t('notes.section_title') }</SheetTitle>
                    <SheetDescription aria-describedby="sheet-description">
                        { t('notes.description') }
                    </SheetDescription>
                </SheetHeader>
                <ScrollArea className="h-full">
                    <main className="p-2 text-base">
                        <RichTextEditor
                            value={text}
                            onChange={onChange}
                            rows={5}
                            maxRows={18}
                            saveTextCallback={handleSaveNotes}
                        />
                    </main>
                </ScrollArea>
                <SheetFooter className={textColor}>
                    <Button 
                        variant='ghost'
                        onClick={handleArchiveNote}
                    >
                        <ArchiveIcon className='mr-2' />
                        { t('archived_note.archive_note_btn') }
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
