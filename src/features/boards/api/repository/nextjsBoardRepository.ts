import { boardModel } from '../../model/board'
import { BoardRepository } from './boardRepository'

export default class NextjsBoardRepository implements BoardRepository {
	async save(board: boardModel, boardId: string): Promise<void> {
		const { updateBoardName } = await import('../actions/updateBoardName')
		await updateBoardName({ boardId, name: board.name })
	}

	async get(boardId: string): Promise<boardModel> {
		const { getBoardById } = await import('../actions/getBoardById')
		const board = await getBoardById({ boardId })
		if (!board) throw new Error(`Board ${boardId} no encontrado`)
		return board
	}
}
