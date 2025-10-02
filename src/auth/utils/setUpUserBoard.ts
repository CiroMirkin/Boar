import { supabase } from '@/lib/supabase'
import { setUserBoard } from './setUserBoard'
import { Dispatch } from '@reduxjs/toolkit'
import { Session } from '@supabase/supabase-js'
import { Dispatch as ReactDispatch, SetStateAction } from 'react'
import { getActualUserBoard } from './getActualUserBoard'
import { saveUserBoardOnSupabase } from './saveUserBoardOnSupabase'
import { UserBoard } from '../model/UserBoard'

/** Recupera el tablero del usuario de Supabase y si no existe ninguno guarda el tablero actual en Supabase. */
export const setUpUserBoard = async ({
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
			const boardFromSupabase = data[0]
			const { data: boardAccessoriesFromSupabase, error: boardAccessoriesError } =
				await supabase
					.from('board_accessories')
					.select('*')
					.eq('id', boardFromSupabase.id)
					.single()

			if (boardAccessoriesError) console.error(boardAccessoriesError)

			const savedUserBoard: UserBoard = {
				board: {
					id: boardFromSupabase.id, 
					name: boardFromSupabase.name,
					column_list: boardFromSupabase.column_list,
					task_list_in_each_column: boardFromSupabase.task_list_in_each_column,
					user_id: boardFromSupabase.user_id 
				},
				accessories: boardAccessoriesFromSupabase,
			}

			const isInitialLoad = sessionStorage.getItem('isInitialLoad')
			if(isInitialLoad === null) {
				setUserBoard({ dispatch, savedUserBoard, setNote })
				return
			}
			if (JSON.stringify(savedUserBoard.board) !== JSON.stringify(actualUserBoard.board)) {
				setUserBoard({ dispatch, savedUserBoard, setNote })
			}
		}
	}
}
