import { boardModel } from '@/pages/board/models/board'
import { BoardRepository } from '@/pages/board/models/boardRepository'

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
			: { id: '1', name: 'Tablero básico' }
	}
}
