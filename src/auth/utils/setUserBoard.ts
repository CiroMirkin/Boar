import { Dispatch } from '@reduxjs/toolkit'
import { UserBoardOnDB } from '../model/UserBoardOnDB'
import { SetStateAction, Dispatch as ReactDispatch } from 'react'
import { setTaskListInEachColumn } from '@/modules/taskList/state/taskListInEachColumnReducer'
import { setBoar } from '@/modules/board/state/boardReducer'
import { setColumnList } from '@/modules/columnList/state/columnListReducer'
import { changeActualTagGroup } from '@/modules/taskList/Tags/state/tagsReducer'
import { setReminder } from '@/modules/taskList/Reminder/state/reminderReducer'

interface SetUserBoardParams {
	dispatch: Dispatch
	savedUserBoard: UserBoardOnDB
	setNote: ReactDispatch<SetStateAction<string>>
}

/** Reestablace los datos del tablero dentro de la aplicacion. */
export const setUserBoard = ({ dispatch, savedUserBoard, setNote }: SetUserBoardParams) => {
	dispatch(setTaskListInEachColumn(savedUserBoard.task_list_in_each_column))
	dispatch(setBoar(savedUserBoard.name))
	dispatch(setColumnList(savedUserBoard.column_list))
	setNote(savedUserBoard.notes)
	dispatch(changeActualTagGroup(savedUserBoard.actual_tag_group))
	dispatch(setReminder(savedUserBoard.reminders))
}
