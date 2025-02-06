import { boardModel } from '@/board/models/board'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'

export const useBoard = (): boardModel => {
	return useSelector((state: RootState) => state.board)
}
