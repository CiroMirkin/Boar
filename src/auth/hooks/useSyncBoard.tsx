import { supabase } from '@/lib/supabase'
import { isDefaultBoardName } from '@/modules/board/models/board'
import { isDefaultColumnList } from '@/modules/columnList/models/columnList'
import { defaultNotes } from '@/modules/notes/model/notes'
import { emptyTaskListInEachColumn } from '@/modules/taskList/models/taskList'
import { setUserBoard } from '../utils/setUserBoard'
import { Dispatch } from '@reduxjs/toolkit'
import { Session } from '@supabase/supabase-js'
import { Dispatch as ReactDispatch, SetStateAction } from 'react'
import { UserBoardOnDB } from '../model/UserBoardOnDB'
import { getActualUserBoard } from '../utils/getActualUserBoard'

const saveUserBoardOnSupabase = async (userBoard: UserBoardOnDB) => {
	try {
		const { error } = await supabase.from('boards').insert(userBoard)
		if (error) throw error
	} catch (e) {
		console.error(e)
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
			setUserBoard({ dispatch, savedUserBoard, setNote })
		}
	}
}
