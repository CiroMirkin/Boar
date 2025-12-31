import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import {
	defaultLibraryOfArchivedNotes,
	LibraryOfArchivedNotes,
} from '../model/libraryOfArchivedNotes'
import { LibraryOfArchiveNotesRepository } from '../model/libraryOfArchivedNotesRepository'

export default class LibraryOfArchivedNotesSupabaseRepository
	implements LibraryOfArchiveNotesRepository
{
	tableName
	constructor() {
		this.tableName = 'archive'
	}

	async save(library: LibraryOfArchivedNotes, boardId: string): Promise<void> {
		if (!isSupabaseConfigured || !supabase) return

		const { error } = await supabase
			.from(this.tableName)
			.update({ notes: library })
			.eq('board_id', boardId)

		if (error) throw error
	}
	async getAll(boardId: string): Promise<LibraryOfArchivedNotes> {
		if (!isSupabaseConfigured || !supabase) return defaultLibraryOfArchivedNotes

		const { data } = await supabase.from('archive').select('notes').eq('board_id', boardId)

		if (data !== null && data.length > 0) {
			const notes: LibraryOfArchivedNotes = data[0].notes
			return notes
		}

		return defaultLibraryOfArchivedNotes
	}
}
