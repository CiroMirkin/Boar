import { supabase } from '@/lib/supabase'
import {
	defaultLibraryOfArchivedNotes,
	LibraryOfArchivedNotes,
} from '../model/libraryOfArchivedNotes'
import { LibraryOfArchiveNotesRepository } from '../model/libraryOfArchivedNotesRepository'
import { getActualBoardId } from '@/auth/utils/getActualBoardId'

export default class LibraryOfArchivedNotesSupabaseRepository
	implements LibraryOfArchiveNotesRepository
{
	tableName
	constructor() {
		this.tableName = 'archive'
	}

	async save(library: LibraryOfArchivedNotes): Promise<void> {
		const boardId = getActualBoardId()
		const { error } = await supabase
			.from(this.tableName)
			.update({ notes: library })
			.eq('board_id', boardId)

		if (error) throw error
	}
	async getAll(): Promise<LibraryOfArchivedNotes> {
		const { data } = await supabase.from('archive').select('notes')
		if (data !== null) {
			const notes: LibraryOfArchivedNotes = data[0].notes
			return notes
		}

		return defaultLibraryOfArchivedNotes
	}
}
