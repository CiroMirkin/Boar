import LocalStorageNotesRepository from '@/modules/notes/repository/LocalStorageNotesRepository'
import { store } from '@/store'
import { UserBoardOnSupabase } from '../model/UserBoardOnSupabase'
import { getUserId } from './getUserId'

export const getActualUserBoard = async (): Promise<UserBoardOnSupabase> => {
	const notes = new LocalStorageNotesRepository().getAll()
	return {
		name: store.getState().board.board.name,
		column_list: store.getState().columnList.list,
		task_list_in_each_column: store.getState().taskListInEachColumn.list,
		user_id: await getUserId(),
		notes,
		actual_tag_group: store.getState().tags.actualTagGroup,
		reminders: store.getState().reminder.reminder,
	}
}
