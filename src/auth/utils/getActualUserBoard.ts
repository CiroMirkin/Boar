import LocalStorageNotesRepository from '@/modules/notes/repository/LocalStorageNotesRepository'
import { store } from '@/store'
import { getUserId } from './getUserId'
import { UserBoard } from '../model/UserBoard'
import { defaultBoard } from '@/modules/board/models/board'
import LocalStorageTaskListInEachColumnRepository from '@/modules/TaskBoard/repository/localStorageTaskListsRepository'
import LocalStorageTagRepository from '@/modules/taskList/components/Tags/repository/localstorageTagRepository'
import LocalStorageArchiveRepository from '@/modules/taskList/components/ArchivedTasks/repository/localStorageArchive'
import LibraryOfArchivedNotesLocalStorageRepository from '@/modules/notes/LibraryOfArchiveNotes/repository/libraryOfArchivedNotesLocalStorageRepository'

export const getActualUserBoard = async (): Promise<UserBoard> => {
	const actualBoard = localStorage.getItem('board-boar')
		? JSON.parse(localStorage.getItem('board-boar') as string)
		: defaultBoard
	const [notes, taskList, tagGroup, archivedTaskList, archivedNotes, userId] = await Promise.all([
		new LocalStorageNotesRepository().getAll(),
		new LocalStorageTaskListInEachColumnRepository().getAll(),
		new LocalStorageTagRepository().get(),
		new LocalStorageArchiveRepository().getAll(),
		new LibraryOfArchivedNotesLocalStorageRepository().getAll(),
		getUserId(),
	])
	return {
		board: {
			id: actualBoard.id,
			name: actualBoard.name,
			task_list_in_each_column: taskList,
			user_id: userId,
		},
		accessories: {
			notes,
			actual_tag_group: tagGroup.actualTagGroup,
			reminders: store.getState().reminder.reminder,
		},
		archive: {
			task_list: archivedTaskList,
			notes: archivedNotes,
			board_id: actualBoard.id,
		},
	}
}
