import { LibraryOfArchivedNotes } from '@/modules/notes/LibraryOfArchiveNotes/model/libraryOfArchivedNotes'
import { Archive } from '@/modules/TaskBoard/components/taskList/components/ArchivedTasks/models/archive'

export interface UserArchiveOnSupabase {
	task_list: Archive
	notes: LibraryOfArchivedNotes
	board_id: string
}
