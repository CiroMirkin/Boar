import { Dispatch } from '@reduxjs/toolkit'
import { setTaskListInEachColumn } from '@/modules/taskList/state/taskListInEachColumnReducer'
import { setColumnList } from '@/modules/columnList/state/columnListReducer'
import { changeActualTagGroup } from '@/modules/taskList/Tags/state/tagsReducer'
import { setReminder } from '@/modules/taskList/Reminder/state/reminderReducer'
import { UserBoard } from '../model/UserBoard'

interface SetUserBoardParams {
	dispatch: Dispatch
	savedUserBoard: UserBoard
}

/** Reestablace los datos del tablero dentro de la aplicacion. */
export const setUserBoard = ({ dispatch, savedUserBoard }: SetUserBoardParams) => {
	const { board, accessories } = savedUserBoard
	// Board and Notes info are now handled by React Query, no need to set in Redux
	dispatch(setTaskListInEachColumn(board.task_list_in_each_column))
	dispatch(setColumnList(board.column_list))
	// Accessories info
	dispatch(changeActualTagGroup(accessories.actual_tag_group))
	dispatch(setReminder(accessories.reminders))
}
