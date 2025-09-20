import LocalStorageNotesRepository from '@/modules/notes/repository/LocalStorageNotesRepository'
import { eisenhowerTagGroup } from '@/modules/taskList/Tags/model/defaultTags'
import { store } from '@/store'
import { UserBoardOnDB } from '../model/UserBoardOnDB'
import { getUserId } from './getUserId'

export const getActualUserBoard = async (): Promise<UserBoardOnDB> => {
	const notes = new LocalStorageNotesRepository().getAll()
	return {
		name: store.getState().board.board.name,
		column_list: store.getState().columnList.list,
		task_list_in_each_column: store.getState().taskListInEachColumn.list,
		user_id: await getUserId(),
		notes,
		actual_tag_group: eisenhowerTagGroup,
		reminders: store.getState().reminder.reminder,
	}
}
