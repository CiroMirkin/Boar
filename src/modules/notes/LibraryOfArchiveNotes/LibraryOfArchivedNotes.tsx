import { ReactNode, useEffect } from "react"
import { LibraryOfArchivedNotes as LibraryOfArchiveNotesModel } from "./model/libraryOfArchivedNotes"
import ArchivedNote from "./components/ArchivedNote"
import { useTheme } from "@/App"
import { useSession } from "@/SessionProvider"
import { useSaveLibraryOfArchivedNotes } from "./repository/useSaveLibraryOfArchivedNotes"

export default function LibraryOfArchiveNotes({ libraryOfArchiveNotes }: { libraryOfArchiveNotes : LibraryOfArchiveNotesModel}) {

    const { session } = useSession()
    useEffect(() => {
        useSaveLibraryOfArchivedNotes({
            notes: libraryOfArchiveNotes,
            session
        })
    }, [libraryOfArchiveNotes])

    const archivedNotesList: ReactNode[] = libraryOfArchiveNotes.archive.reverse().map(note => (
        <div className="p-0 m-0" key={note.id}>
            <ArchivedNote note={note} />
        </div>
    ))

    const { bg } = useTheme()
    const className = `w-full h-full p-4 flex flex-col gap-4 items-center ${bg}`
    return (
        <main className={className}>
            { 
                libraryOfArchiveNotes.archive.length == 0
                && <p className="opacity-50 text-lg">Aún no hay notar archivadas.</p>
            }
            { archivedNotesList }
        </main>
    )
}