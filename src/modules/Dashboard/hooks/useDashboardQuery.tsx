import { useSession } from '@/auth/hooks/useSession'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabaseDashboard } from '../repository/supabaseDashboardRepository'
import BusinessError from '@/common/errors/businessError'

const queryKey = ['board-dashboard']

export const useDashboardQuery = () => {
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

	const { mutate: deleteBoard } = useMutation({
		mutationFn: async (boardId: string) => {
			if (!session) {
				throw new BusinessError('No hay sesión activa')
			}

			if (!boardId.trim()) {
				throw new BusinessError('Es necesario el ID del tablero para poder eliminarlo')
			}

			return await supabaseDashboard.deleteBoard({ boardId })
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey })
		},
	})

	const { mutate: createAnEmptyBoard } = useMutation({
		mutationFn: async (boardName: string) => {
			console.log(!session, boardName)
			if (!session) {
				throw new BusinessError('No hay sesión activa')
			}

			if (!boardName.trim()) {
				throw new BusinessError('El nombre del tablero no puede estar vacío')
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
