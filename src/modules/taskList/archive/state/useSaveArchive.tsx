import { Archive } from "../models/archive"
import { SessionType } from "@/SessionProvider"
import { sendForSaveArchive } from "./sendForSaveArchive"
import LocalStorageArchiveRepository from "./localStorageArchive"

interface useSaveArchiveParams {
    archive: Archive
    session: SessionType
    emptyArchive?: boolean 
}

export const useSaveArchive = ({ archive, session, emptyArchive = false }: useSaveArchiveParams) => {
    const localStorage = new LocalStorageArchiveRepository()
    const localArchive = localStorage.getAll()

    if(JSON.stringify(archive) !== JSON.stringify([]) || emptyArchive) {
        const isNotTheLocalArchive = JSON.stringify(archive) !== JSON.stringify(localArchive)
        if(!!session && isNotTheLocalArchive) {
            sendForSaveArchive(archive)
        }
        else {
            localStorage.save(archive)
        } 
    }
}