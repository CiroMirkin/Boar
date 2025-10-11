import { boardModel, defaultBoard } from '@/modules/board/models/board'
import { BoardRepository } from '@/modules/board/repository/boardRepository'

export default class LocalStorageBoardRepository implements BoardRepository {
	key
	constructor() {
		this.key = 'board-boar'
	}
	async save(board: boardModel): Promise<void> {
		localStorage.setItem(this.key, JSON.stringify(board))
	}
	async get(): Promise<boardModel> {
		return localStorage.getItem(this.key)
			? JSON.parse(localStorage.getItem(this.key) as string)
			: defaultBoard
	}
}
