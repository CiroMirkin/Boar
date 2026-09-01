import { boardModel } from '@/modules/board/models/board'
import { BoardRepository } from '@/modules/board/repository/boardRepository'

export default class NextjsBoardRepository implements BoardRepository {
	async save(board: boardModel, boardId: string): Promise<void> {
		const { updateBoardName } = await import('@/actions/board')
		await updateBoardName({ boardId, name: board.name })
	}

	async get(boardId: string): Promise<boardModel> {
		const { getBoardById } = await import('@/actions/board')
		const board = await getBoardById({ boardId })
		if (!board) throw new Error(`Board ${boardId} no encontrado`)
		return board
	}
}
