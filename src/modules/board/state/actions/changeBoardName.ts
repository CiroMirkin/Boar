import BusinessError from '@/sharedByModules/errors/businessError'
import { boardModel } from '../../models/board'
import { boardUseCaseParams } from '../actions'

interface changeNameParams extends boardUseCaseParams {
	newName: string
}

export function changeBoardName({ board, newName }: changeNameParams): boardModel {
	if (!newName.trim()) throw new BusinessError('El tablero debe tener un nobmre.')

	const newBoard = board
	newBoard.name = newName
	return newBoard
}
