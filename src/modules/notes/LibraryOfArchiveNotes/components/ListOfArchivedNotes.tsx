import { ReactNode } from "react"
import ArchivedNote from "./ArchivedNote"
import { useLibraryOfArchivedNotes } from "../state/useLibraryOfArchivedNotes"
import { ArchivedNote as ArchivedNoteModel} from "../model/archivedNote"

export function ListOfArchivedNotes() {
    const archivedNotes = useLibraryOfArchivedNotes().archive
    const archivedNotesList: ReactNode[] = archivedNotes.map((note: ArchivedNoteModel) => (
        <div className="p-0 m-0 w-full" key={note.id}>
            <ArchivedNote note={note} />
        </div>
    ))

    return (
        <>
            { 
                archivedNotes.length == 0
                && <p className="opacity-50 text-lg">Aún no hay notar archivadas.</p>
            }
            { archivedNotesList }
        </>
    )
}