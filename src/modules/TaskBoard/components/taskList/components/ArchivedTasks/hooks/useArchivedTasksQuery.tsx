import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from '@/auth/hooks/useSession'
import { Archive, emptyArchivedTasks } from '../models/archive'
import { fetchArchivedTasks, saveArchivedTasks } from '../repository'
import { getActualBoardId } from '@/auth/utils/getActualBoardId'

const archivedTasksQueryKey = ['archived-tasks']

export const useArchivedTasksQuery = () => {
	const { session } = useSession()
	const queryClient = useQueryClient()

	const userId = session?.user.id ?? 'guest'
	const boardId = getActualBoardId()
	const fullQueryKey = [...archivedTasksQueryKey, userId, boardId] as const

	const {
		data: archivedTasks = emptyArchivedTasks,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: fullQueryKey,
		queryFn: () => fetchArchivedTasks(session),
		initialData: emptyArchivedTasks,
	})

	const { mutate: updateArchivedTasks, isPending: isSaving } = useMutation({
		mutationFn: (newArchivedTasks: Archive) =>
			saveArchivedTasks({
				session,
				archivedTasks: newArchivedTasks,
			}),
		onMutate: async (newArchivedTasks: Archive) => {
			await queryClient.cancelQueries({ queryKey: fullQueryKey })
			const previousArchivedTasks = queryClient.getQueryData<Archive>(fullQueryKey)
			queryClient.setQueryData(fullQueryKey, newArchivedTasks)
			return { previousArchivedTasks }
		},
		onError: (_err, _newArchivedTasks, context) => {
			if (context?.previousArchivedTasks) {
				queryClient.setQueryData(fullQueryKey, context.previousArchivedTasks)
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: fullQueryKey })
		},
	})

	return {
		archivedTasks,
		isLoading,
		isError,
		error,
		updateArchivedTasks,
		isSaving,
	}
}
