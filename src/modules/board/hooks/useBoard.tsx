import { boardModel } from '@/modules/board/models/board'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'

export const useBoard = (): boardModel => {
	const board = useSelector((state: RootState) => state.board.board)
	return board
}
