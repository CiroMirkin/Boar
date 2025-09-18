import { supabase } from '@/lib/supabase'
import { isDefaultBoardName } from '@/modules/board/models/board'
import { setBoar } from '@/modules/board/state/boardReducer'
import { ColumnList, isDefaultColumnList } from '@/modules/columnList/models/columnList'
import { setColumnList } from '@/modules/columnList/state/columnListReducer'
import { defaultNotes, Notes } from '@/modules/notes/model/notes'
import LocalStorageNotesRepository from '@/modules/notes/repository/LocalStorageNotesRepository'
import { emptyTaskListInEachColumn, TaskListInEachColumn } from '@/modules/taskList/models/taskList'
import { Reminder } from '@/modules/taskList/Reminder/reminder'
import { setReminder } from '@/modules/taskList/Reminder/state/reminderReducer'
import { setTaskListInEachColumn } from '@/modules/taskList/state/taskListInEachColumnReducer'
import { eisenhowerTagGroup } from '@/modules/taskList/Tags/model/defaultTags'
import { TagGroup } from '@/modules/taskList/Tags/model/tags'
import { changeActualTagGroup } from '@/modules/taskList/Tags/state/tagsReducer'
import { store } from '@/store'
import { Dispatch } from '@reduxjs/toolkit'
import { Session } from '@supabase/supabase-js'
import { Dispatch as ReactDispatch, SetStateAction } from 'react'

interface UserBoard {
	name: string
	column_list: ColumnList
	task_list_in_each_column: TaskListInEachColumn
	user_id: string | undefined
	notes: Notes
	actual_tag_group: TagGroup
	reminders: Reminder
}

const saveUserBoardOnSupabase = async (userBoard: UserBoard) => {
	try {
		const { error } = await supabase.from('boards').insert(userBoard)
		if (error) throw error
	} catch (e) {
		console.error(e)
	}
}

/** Reestablace los datos del tablero dentro de la aplicacion. */
const changeActualBoardBySavedBoard = ({
	dispatch,
	savedUserBoard,
	setNote,
}: {
	dispatch: Dispatch
	savedUserBoard: UserBoard
	setNote: ReactDispatch<SetStateAction<string>>
}) => {
	dispatch(setTaskListInEachColumn(savedUserBoard.task_list_in_each_column))
	dispatch(setBoar(savedUserBoard.name))
	dispatch(setColumnList(savedUserBoard.column_list))
	setNote(savedUserBoard.notes)
	dispatch(changeActualTagGroup(savedUserBoard.actual_tag_group))
	dispatch(setReminder(savedUserBoard.reminders))
}

export const getUserId = async () => {
	const {
		data: { user },
	} = await supabase.auth.getUser()
	return user?.id
}

const getActualUserBoard = async (): Promise<UserBoard> => {
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

/** @returns True si el usuario tiene el tablero por defecto (vacio) */
export const checkIfUserHasTheDefaultBoard = async (): Promise<boolean> => {
	const actualUserBoard = await getActualUserBoard()
	return (
		isDefaultBoardName(actualUserBoard.name) &&
		isDefaultColumnList(actualUserBoard.column_list) &&
		JSON.stringify(actualUserBoard.task_list_in_each_column) ===
			JSON.stringify(emptyTaskListInEachColumn) &&
		actualUserBoard.notes === defaultNotes
	)
}

/** Recupera el tablero del usuario de Supabase y si no existe ninguno guarda el tablero actual en Supabase. */
export const syncBoard = async ({
	dispatch,
	session,
	setNote,
}: {
	dispatch: Dispatch
	session: Session
	setNote: ReactDispatch<SetStateAction<string>>
}) => {
	const actualUserBoard = await getActualUserBoard()
	const { data } = await supabase.from('boards').select('*').eq('user_id', session.user.id)

	if (session) {
		if (data != null && data.length === 0) {
			saveUserBoardOnSupabase(actualUserBoard)
		} else if (data != null) {
			const savedUserBoard = data[0]
			changeActualBoardBySavedBoard({ dispatch, savedUserBoard, setNote })
		}
	}
}
