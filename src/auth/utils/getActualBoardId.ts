import { store } from '@/store'

export const getActualBoardId = (): string => {
	return store.getState().board.board.id
}
