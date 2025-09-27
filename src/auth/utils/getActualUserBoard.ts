import LocalStorageNotesRepository from '@/modules/notes/repository/LocalStorageNotesRepository'
import { store } from '@/store'
import { getUserId } from './getUserId'
import { UserBoard } from '../model/UserBoard'

export const getActualUserBoard = async (): Promise<UserBoard> => {
	const notes = new LocalStorageNotesRepository().getAll()
	return {
		board: {
			name: store.getState().board.board.name,
			column_list: store.getState().columnList.list,
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
