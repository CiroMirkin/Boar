import BusinessError from '@/common/errors/businessError'
import { boardModel } from '../models/board'

interface changeNameParams {
	board: boardModel
	newName: string
}

export function changeBoardName({ board, newName }: changeNameParams): boardModel {
	if (!newName.trim()) throw new BusinessError('El tablero debe tener un nobmre.')

	const newBoard = board
	newBoard.name = newName
	return newBoard
}
