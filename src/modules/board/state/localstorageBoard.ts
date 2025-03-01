import { boardModel, defaultBoard } from '@/modules/board/models/board'
import { BoardRepository } from '@/modules/board/models/boardRepository'

export default class LocalStorageBoardRepository implements BoardRepository {
	#key
	constructor() {
		this.#key = 'board-boar'
	}
	save(archive: boardModel): void {
		localStorage.setItem(this.#key, JSON.stringify(archive))
	}
	getAll(): boardModel {
		return localStorage.getItem(this.#key)
			? JSON.parse(localStorage.getItem(this.#key) as string)
			: defaultBoard
	}
}
