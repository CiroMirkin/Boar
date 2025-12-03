import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import { Session } from '@supabase/supabase-js'
import { getActualUserBoard } from './getActualUserBoard'
import { saveUserBoardOnSupabase } from './saveUserBoardOnSupabase'
import { defaultBoard } from '@/modules/board/models/board'
import { v4 as uuidv4 } from 'uuid'
import { saveActualBoardId } from './getActualBoardId'

export const setUpUserBoard = async ({ session }: { session: Session }) => {
	if (!isSupabaseConfigured || !supabase) return

	if (sessionStorage.getItem('isInitialLoad') === 'false') {
		return
	}

	const actualUserBoard = await getActualUserBoard()
	const { data, error } = await supabase
		.from('boards')
		.select('id')
		.eq('user_id', session.user.id)
		.limit(1)

	if (error) {
		console.error(error)
		return
	}

	if (data.length === 0) {
		const boardForNewUser = {
			...actualUserBoard,
		}
		if (boardForNewUser.board.id === defaultBoard.id) {
			const newBoardId = uuidv4()
			boardForNewUser.board.id = newBoardId
			boardForNewUser.archive.board_id = newBoardId
			saveActualBoardId(newBoardId)
		}
		await saveUserBoardOnSupabase(boardForNewUser)
	}
	sessionStorage.setItem('isInitialLoad', 'false')
}
