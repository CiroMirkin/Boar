import { boardModel, defaultBoard } from '../../model/board'
import { BoardRepository } from './boardRepository'

export default class LocalStorageBoardRepository implements BoardRepository {
	key
	constructor() {
		// prefijo 'boar' (nombre anterior del proyecto): no renombrar para no invalidar el localStorage de usuarios existentes
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
