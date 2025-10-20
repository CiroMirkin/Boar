import { defaultBoard } from '@/modules/board/models/board'

const STORAGE_KEY = 'boar-board-id'

export const getActualBoardId = (): string => {
	const boardId = sessionStorage.getItem(STORAGE_KEY) || defaultBoard.id
	return boardId
}

export const saveActualBoardId = (id: string) => sessionStorage.setItem(STORAGE_KEY, id)
