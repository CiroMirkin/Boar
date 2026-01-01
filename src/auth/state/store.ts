import { create } from 'zustand'
import { getActualBoardId } from '../utils/getActualBoardId'

type BoardIdStore = {
	board_id: string
	updateBoardId: () => void
}

const getBoardId = () => {
	const storedBoardId = sessionStorage.getItem('b_id')
	if (storedBoardId) return storedBoardId

	const actualBoardId = getActualBoardId()
	sessionStorage.setItem('b_id', actualBoardId)
	return actualBoardId
}

export const useBoardId = create<BoardIdStore>((set) => ({
	board_id: getBoardId(),
	updateBoardId: () => {
		const id = getActualBoardId()
		sessionStorage.setItem('b_id', id)
		set(() => ({
			board_id: id,
		}))
	},
}))
