import { boardModel } from '../models/board'

export interface BoardRepository {
	save(boards: boardModel): void
	getAll(): boardModel
}
