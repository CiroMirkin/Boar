import { useTheme } from "@/App"
import { ListOfArchivedNotes } from "./components/ListOfArchivedNotes"

export default function LibraryOfArchiveNotes() {
    const { bg } = useTheme()
    const className = `w-full h-full p-4 flex flex-col gap-4 items-center ${bg}`
    return (
        <main className={className}>
            <ListOfArchivedNotes />
        </main>
    )
}