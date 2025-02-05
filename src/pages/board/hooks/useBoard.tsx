import { boardModel } from '@/pages/board/models/board'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'

export const useBoard = (): boardModel => {
	return useSelector((state: RootState) => state.board)
}
