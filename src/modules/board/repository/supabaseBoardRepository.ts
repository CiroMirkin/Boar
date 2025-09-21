import { getUserId } from '@/auth/utils/getUserId'
import { supabase } from '@/lib/supabase'
import { boardModel, defaultBoard } from '@/modules/board/models/board'
import { BoardRepository } from '@/modules/board/repository/boardRepository'

export default class SupabaseBoardRepository implements BoardRepository {
	constructor() {}
	async save(board: boardModel) {
		const user_id = await getUserId()
		const { error } = await supabase
			.from('boards')
			.update({
				name: board.name,
			})
			.eq('user_id', user_id)

		if (error) throw error
	}
	async getAll() {
		const user_id = await getUserId()
		const { data, error } = await supabase
			.from('boards')
			.select('id, name')
			.eq('user_id', user_id)

		if (error) throw error

		const board = {
			name: data[0].name,
			id: data[0].id,
		}
		return board ? board : defaultBoard
	}
}
