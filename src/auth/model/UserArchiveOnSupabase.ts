import { LibraryOfArchivedNotes } from '@/modules/notes/LibraryOfArchiveNotes/model/libraryOfArchivedNotes'
import { Archive } from '@/modules/taskList/ArchivedTasks/models/archive'

export interface UserArchiveOnSupabase {
	task_list: Archive
	notes: LibraryOfArchivedNotes
	board_id: string
}
