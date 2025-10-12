import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchColumnList, saveColumnList } from '../repository'
import { useSession } from '@/auth/hooks/useSession'
import { ColumnList } from '../models/columnList'

const columnListQueryKey = ['columnList']

export const useColumnListQuery = () => {
	const { session } = useSession()
	const queryClient = useQueryClient()

	const {
		data: columnList,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: [...columnListQueryKey, session?.user.id],
		queryFn: () => fetchColumnList(session),
	})

	const { mutate: updateColumnList, isPending: isSaving } = useMutation({
		mutationFn: (updatedColumnList: ColumnList) =>
			saveColumnList({ columnList: updatedColumnList, session }),
		onMutate: async (updatedColumnList: ColumnList) => {
			await queryClient.cancelQueries({ queryKey: columnListQueryKey })
			const previousColumnList = queryClient.getQueryData(columnListQueryKey)
			queryClient.setQueryData(columnListQueryKey, updatedColumnList)
			return { previousColumnList }
		},
		onError: (_err, _newColumnList, context) => {
			if (context?.previousColumnList) {
				queryClient.setQueryData(columnListQueryKey, context.previousColumnList)
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: columnListQueryKey })
			// Invalidate taskList queries when columnList changes
			queryClient.invalidateQueries({ queryKey: ['taskListInEachColumn'] })
		},
	})

	return {
		columnList,
		isLoading,
		isError,
		error,
		updateColumnList,
		isSaving,
	}
}
