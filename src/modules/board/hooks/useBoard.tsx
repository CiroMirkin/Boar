import { boardModel, isDefaultBoardName } from '@/modules/board/models/board'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export const useBoard = (): boardModel => {
	const board = useSelector((state: RootState) => state.board.board)
	const { t } = useTranslation()

	return useMemo(() => {
		if (isDefaultBoardName(board.name) || board.name === '') {
			return {
				...board,
				name: t('board_name'),
			}
		}

		return board
	}, [board, t])
}
