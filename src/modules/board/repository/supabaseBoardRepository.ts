import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import { boardModel, defaultBoard } from '@/modules/board/models/board'
import { BoardRepository } from '@/modules/board/repository/boardRepository'

export default class SupabaseBoardRepository implements BoardRepository {
	constructor() {}
	async save(board: boardModel, boardId: string) {
		if (!isSupabaseConfigured || !supabase) return

		const { error } = await supabase
			.from('boards')
			.update({
				name: board.name,
			})
			.eq('id', boardId)

		if (error) throw error
	}
	async get(boardId: string) {
		if (!isSupabaseConfigured || !supabase) return defaultBoard

		const { data, error } = await supabase.from('boards').select('id, name').eq('id', boardId)

		if (error) throw error

		const board = {
			name: data[0].name,
			id: data[0].id,
		}

		return board ? board : defaultBoard
	}
}
