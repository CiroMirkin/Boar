import { defaultBoard } from '@/modules/board/models/board'

export const getActualBoardId = (): string => {
	const board = localStorage.getItem('board-boar')
		? JSON.parse(localStorage.getItem('board-boar') as string)
		: defaultBoard
	return board.id
}
