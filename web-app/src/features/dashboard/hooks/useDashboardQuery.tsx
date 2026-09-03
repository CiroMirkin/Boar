'use client'

import { useSession } from '@/features/auth'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getBoards } from '../api/actions/getBoards'
import { createBoard } from '../api/actions/createBoard'
import { deleteBoard as deleteBoardAction } from '../api/actions/deleteBoard'
import BusinessError from '@/shared/errors/businessError'
import { useTranslation } from 'react-i18next'

const queryKey = ['board-dashboard']

export const useDashboardQuery = () => {
	const { t } = useTranslation()
	const { session } = useSession()
	const queryClient = useQueryClient()

	const {
		data: boards = [],
		isLoading,
		error,
	} = useQuery({
		queryKey,
		queryFn: async () => {
			if (!session) return []
			return getBoards()
		},
		enabled: !!session,
	})

	const { mutateAsync: deleteBoard } = useMutation({
		mutationFn: async (boardId: string) => {
			if (!session) throw new BusinessError(t('dashboard.no_active_session'))
			if (!boardId.trim()) throw new BusinessError(t('dashboard.board_id_required'))
			return deleteBoardAction({ boardId })
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey }),
	})

	const { mutateAsync: createAnEmptyBoard } = useMutation({
		mutationFn: async (boardName: string) => {
			if (!session) throw new BusinessError(t('dashboard.no_active_session'))
			if (!boardName.trim()) throw new BusinessError(t('dashboard.board_name_required'))
			return createBoard({ name: boardName })
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey }),
	})

	return { boards, isLoading, error, deleteBoard, createAnEmptyBoard }
}
