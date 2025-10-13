import LocalStorageNotesRepository from '@/modules/notes/repository/LocalStorageNotesRepository'
import { store } from '@/store'
import { getUserId } from './getUserId'
import { UserBoard } from '../model/UserBoard'
import { defaultBoard } from '@/modules/board/models/board'
import LocalStorageColumnListRepository from '@/modules/columnList/repository/localStorageColumnList'

export const getActualUserBoard = async (): Promise<UserBoard> => {
	const notes = await new LocalStorageNotesRepository().getAll()
	const actualBoard = localStorage.getItem('board-boar')
		? JSON.parse(localStorage.getItem('board-boar') as string)
		: defaultBoard
	const columnList = await new LocalStorageColumnListRepository().getAll()
	return {
		board: {
			id: actualBoard.id,
			name: actualBoard.name,
			column_list: columnList,
			task_list_in_each_column: store.getState().taskListInEachColumn.list,
			user_id: await getUserId(),
		},
		accessories: {
			notes,
			actual_tag_group: store.getState().tags.actualTagGroup,
			reminders: store.getState().reminder.reminder,
		},
	}
}
