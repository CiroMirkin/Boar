'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchBoard, saveBoard } from '../repository/boardRepository'
import { useSession } from '@/auth/hooks/useSession'
import { boardModel, defaultBoard, isDefaultBoardName } from '../models/board'
import { useTranslation } from 'react-i18next'
import { useCallback, useEffect } from 'react'
import { useBoardId } from '@/auth/state/store'

const boardQueryKey = ['board']

export const useBoardQuery = (boardId: string) => {
	const { session, isLoading: isSessionLoading } = useSession()
	const queryClient = useQueryClient()
	const { t, i18n } = useTranslation()

	const setBoardId = useBoardId((s) => s.setBoardId)
	useEffect(() => {
		setBoardId(boardId)
	}, [boardId, setBoardId])

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
		queryKey: [...boardQueryKey, session?.user.id, boardId],
		queryFn: () => fetchBoard(session, boardId),
		placeholderData: defaultBoard,
		select,
		enabled: !!boardId && !isSessionLoading,
	})

	const { mutate: updateBoard, isPending: isSaving } = useMutation({
		mutationFn: (updatedBoard: boardModel) => {
			let toSave = updatedBoard
			if (updatedBoard.name === t(defaultBoard.name)) {
				toSave = { ...updatedBoard, name: defaultBoard.name }
			}
			return saveBoard({ board: toSave, session, boardId })
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
