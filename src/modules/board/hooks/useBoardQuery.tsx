import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchBoard, saveBoard } from '../repository/boardRepository'
import { useSession } from '@/auth/hooks/useSession'
import { boardModel, defaultBoard, isDefaultBoardName } from '../models/board'
import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'

const boardQueryKey = ['board']

export const useBoardQuery = () => {
	const { session } = useSession()
	const queryClient = useQueryClient()
	const { t, i18n } = useTranslation()

	const select = useCallback(
		(rawData: boardModel | undefined) => {
			const data = rawData ?? defaultBoard
			if (isDefaultBoardName(data.name)) {
				return { ...data, name: t('board_name') }
			}
			return data
		},
		[t, i18n.language] // eslint-disable-line react-hooks/exhaustive-deps
	)

	const {
		data: board,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: [...boardQueryKey, session?.user.id],
		queryFn: () => fetchBoard(session),
		placeholderData: defaultBoard,
		select,
	})

	const { mutate: updateBoard, isPending: isSaving } = useMutation({
		mutationFn: (updatedBoard: boardModel) => {
			let toSave = updatedBoard
			if (updatedBoard.name === t(defaultBoard.name)) {
				toSave = { ...updatedBoard, name: defaultBoard.name }
			}
			return saveBoard({ board: toSave, session })
		},
		onMutate: async (updatedBoard: boardModel) => {
			await queryClient.cancelQueries({ queryKey: boardQueryKey })
			const previousBoard = queryClient.getQueryData(boardQueryKey)
			queryClient.setQueryData(boardQueryKey, updatedBoard)
			return { previousBoard }
		},
		onError: (_err, _newBoard, context) => {
			if (context?.previousBoard) {
				queryClient.setQueryData(boardQueryKey, context.previousBoard)
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: boardQueryKey })
		},
	})

	return {
		board,
		isLoading,
		isError,
		error,
		updateBoard,
		isSaving,
	}
}
