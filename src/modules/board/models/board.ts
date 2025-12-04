import BusinessError from '@/commond/errors/businessError'

export interface boardModel {
	id: string
	name: string
}

export const defaultBoard: boardModel = {
	id: '1',
	name: 'Tablero básico',
}

export const isThisBoardNameWithinTheLimitOfLetters = (boardName: string): boolean => {
	return boardName.length < 30
}

export const isThisBoardNameValid = (boardName: string): boolean | BusinessError => {
	if (!boardName.trim()) throw new BusinessError('El tablero debe tener un nobmre.')
	else if (!isThisBoardNameWithinTheLimitOfLetters(boardName))
		throw new BusinessError('El nombre es demasiado largo.')
	return true
}

export const isDefaultBoardName = (boardName: string): boolean => {
	return boardName === defaultBoard.name
}

export const isDefaultBoard = (board: boardModel): boolean => {
	return board.id === defaultBoard.id && board.name === defaultBoard.name
}
