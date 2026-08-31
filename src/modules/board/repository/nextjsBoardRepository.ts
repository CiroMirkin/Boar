import { boardModel } from '@/modules/board/models/board'
import { BoardRepository } from '@/modules/board/repository/boardRepository'
import { getBoardById, updateBoardName } from '@/actions/board'

export default class NextjsBoardRepository implements BoardRepository {
	async save(board: boardModel, boardId: string): Promise<void> {
		await updateBoardName({ boardId, name: board.name })
	}

	async get(boardId: string): Promise<boardModel> {
		const board = await getBoardById({ boardId })
		if (!board) throw new Error(`Board ${boardId} no encontrado`)
		return board
	}
}
