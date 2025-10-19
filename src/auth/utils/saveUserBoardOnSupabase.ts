import { supabase } from '@/lib/supabase'
import { UserBoard } from '../model/UserBoard'

export const saveUserBoardOnSupabase = async (userBoard: UserBoard) => {
	try {
		const { error: board_error, data: boardFromSupabase } = await supabase
			.from('boards')
			.insert(userBoard.board)
			.select()
			.single()

		if (board_error) throw board_error

		const { error: accessories_error } = await supabase.from('board_accessories').insert({
			...userBoard.accessories,
			id: boardFromSupabase.id,
		})

		if (accessories_error) throw accessories_error

		const { error: archive_error } = await supabase.from('archive').insert({
			...userBoard.archive,
			board_id: boardFromSupabase.id,
		})
		if (archive_error) throw archive_error
	} catch (e) {
		console.error(e)
	}
}
