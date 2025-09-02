import { setTaskListInEachColumn } from '@/modules/taskList/state/taskListInEachColumnReducer'
import { emptyTaskListInEachColumn } from '@/modules/taskList/models/taskList'
import { setColumnList } from '@/modules/columnList/state/columnListReducer'
import { defaultColumnList } from '@/modules/columnList/models/columnList'
import { setBoar } from '@/modules/board/state/boardReducer'
import { defaultBoard } from '@/modules/board/models/board'
import { Dispatch } from '@reduxjs/toolkit'

export const setBoardByDefault = (dispatch: Dispatch): void => {
	dispatch(setTaskListInEachColumn(emptyTaskListInEachColumn))
	dispatch(setColumnList(defaultColumnList))
	dispatch(setBoar(defaultBoard.name))
}
