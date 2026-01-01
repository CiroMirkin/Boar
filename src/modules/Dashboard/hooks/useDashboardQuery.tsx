import { useSession } from '@/auth/hooks/useSession'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabaseDashboard } from '../repository/supabaseDashboardRepository'
import BusinessError from '@/common/errors/businessError'
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
			if (!session) {
				return []
			}
			return supabaseDashboard.getBoards()
		},
		enabled: !!session,
	})

	const { mutateAsync: deleteBoard } = useMutation({
		mutationFn: async (boardId: string) => {
			if (!session) {
				throw new BusinessError(t('dashboard.no_active_session'))
			}

			if (!boardId.trim()) {
				throw new BusinessError(t('dashboard.board_id_required'))
			}

			return await supabaseDashboard.deleteBoard({ boardId })
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey })
		},
	})

	const { mutateAsync: createAnEmptyBoard } = useMutation({
		mutationFn: async (boardName: string) => {
			if (!session) {
				throw new BusinessError(t('dashboard.no_active_session'))
			}

			if (!boardName.trim()) {
				throw new BusinessError(t('dashboard.board_name_required'))
			}

			return await supabaseDashboard.createAnEmptyBoard({ name: boardName })
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey })
		},
	})

	return {
		boards,
		isLoading,
		error,
		deleteBoard,
		createAnEmptyBoard,
	}
}
