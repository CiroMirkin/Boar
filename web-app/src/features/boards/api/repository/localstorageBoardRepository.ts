import { boardModel, defaultBoard } from '../../model/board'
import { BoardRepository } from './boardRepository'

export default class LocalStorageBoardRepository implements BoardRepository {
	key
	constructor() {
		this.key = 'board-capo'
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
