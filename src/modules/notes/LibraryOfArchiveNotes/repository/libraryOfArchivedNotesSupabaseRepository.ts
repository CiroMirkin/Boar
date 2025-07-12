import { supabase } from "@/lib/supabase"
import { defaultLibraryOfArchivedNotes, LibraryOfArchivedNotes } from "../model/libraryOfArchivedNotes"
import { getUserId } from "@/sharedByModules/hooks/useSyncUserBoard"
import { LibraryOfArchiveNotesRepository } from "../model/libraryOfArchivedNotesRepository"

export default class LibraryOfArchivedNotesSupabaseRepository implements LibraryOfArchiveNotesRepository {
    tableName
    constructor() {
        this.tableName = 'archive'
    }

    async save(library: LibraryOfArchivedNotes): Promise<void> {
        const user_id = await getUserId()
        const { error } = await supabase
            .from(this.tableName)
            .update({ notes: library })
            .eq('user_id', user_id)
        
          if(error) throw error
    }
    async getAll(): Promise<LibraryOfArchivedNotes> {
        const { data } = await supabase
            .from(this.tableName)
            .select('notes')
        
        if(data !== null){
            const notes: LibraryOfArchivedNotes = data[0].notes
            return notes
        }

        return defaultLibraryOfArchivedNotes
    }
}