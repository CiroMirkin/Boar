import LocalStorageNotesRepository from '@/modules/notes/repository/LocalStorageNotesRepository'
import { store } from '@/store'
import { getUserId } from './getUserId'
import { UserBoard } from '../model/UserBoard'
import { defaultBoard } from '@/modules/board/models/board'
import LocalStorageColumnListRepository from '@/modules/columnList/repository/localStorageColumnList'
import LocalStorageTaskListInEachColumnRepository from '@/modules/taskList/repository/localStorageTaskListsRepository'
import LocalStorageTagRepository from '@/modules/taskList/Tags/repository/localstorageTagRepository'
import LocalStorageArchiveRepository from '@/modules/taskList/ArchivedTasks/repository/localStorageArchive'
import LibraryOfArchivedNotesLocalStorageRepository from '@/modules/notes/LibraryOfArchiveNotes/repository/libraryOfArchivedNotesLocalStorageRepository'

export const getActualUserBoard = async (): Promise<UserBoard> => {
	const actualBoard = localStorage.getItem('board-boar')
		? JSON.parse(localStorage.getItem('board-boar') as string)
		: defaultBoard
	const [notes, columnList, taskList, tagGroup, archivedTaskList, archivedNotes, userId] =
		await Promise.all([
			new LocalStorageNotesRepository().getAll(),
			new LocalStorageColumnListRepository().getAll(),
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
			column_list: columnList,
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
