import { supabase } from '@/lib/supabase'
import { Dispatch } from '@reduxjs/toolkit'
import { Session } from '@supabase/supabase-js'
import { getActualUserBoard } from './getActualUserBoard'
import { saveUserBoardOnSupabase } from './saveUserBoardOnSupabase'
import { defaultBoard } from '@/modules/board/models/board'
import { v4 as uuidv4 } from 'uuid'
import { saveActualBoardId } from './getActualBoardId'

/** Recupera el tablero del usuario de Supabase y si no existe ninguno guarda el tablero actual en Supabase. */
export const setUpUserBoard = async ({ session }: { dispatch: Dispatch; session: Session }) => {
	const actualUserBoard = await getActualUserBoard()
	const { data } = await supabase.from('boards').select('*').eq('user_id', session.user.id)

	if (session) {
		if (data != null && data.length === 0) {
			const boardForNewUser = {
				...actualUserBoard,
			}
			if (boardForNewUser.board.id === defaultBoard.id) {
				const newBoardId = uuidv4()
				boardForNewUser.board.id = newBoardId
				boardForNewUser.archive.board_id = newBoardId
				saveActualBoardId(newBoardId)
			}
			saveUserBoardOnSupabase(boardForNewUser)
		}
	}
}
