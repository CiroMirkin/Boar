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

export const isDefaultBoardName = (boardName: string): boolean => {
	return boardName === defaultBoard.name
}
