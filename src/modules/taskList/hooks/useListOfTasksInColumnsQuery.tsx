import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchTaskListInEachColumn, saveTaskListInEachColumn } from '../repository'
import { useSession } from '@/auth/hooks/useSession'
import { emptyTaskListInEachColumn, TaskListInEachColumn } from '../models/taskList'

const taskListInEachColumnsQueryKey = ['taskListInEachColumns']

export const useListOfTasksInColumnsQuery = () => {
	const { session } = useSession()
	const queryClient = useQueryClient()

	const userId = session?.user.id ?? 'guest'
	const fullQueryKey = [...taskListInEachColumnsQueryKey, userId]

	const {
		data: listOfTaskInColumns = emptyTaskListInEachColumn,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: fullQueryKey,
		queryFn: () => fetchTaskListInEachColumn(session),
		initialData: emptyTaskListInEachColumn,
	})

	const { mutate: updateListOfTaskInColumns, isPending: isSaving } = useMutation({
		mutationFn: (updatedTaskListInEachColumn: TaskListInEachColumn) =>
			saveTaskListInEachColumn({
				taskListInEachColumn: updatedTaskListInEachColumn,
				session,
			}),
		onMutate: async (updatedTaskListInEachColumn: TaskListInEachColumn) => {
			await queryClient.cancelQueries({ queryKey: fullQueryKey })

			const previousTaskListInEachColumn =
				queryClient.getQueryData<TaskListInEachColumn>(fullQueryKey)

			queryClient.setQueryData(fullQueryKey, updatedTaskListInEachColumn)

			return { previousTaskListInEachColumn }
		},
		onError: (_err, _newTaskListInEachColumn, context) => {
			if (context?.previousTaskListInEachColumn) {
				queryClient.setQueryData(fullQueryKey, context.previousTaskListInEachColumn)
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: fullQueryKey })
		},
	})

	return {
		listOfTaskInColumns,
		isLoading,
		isError,
		error,
		updateListOfTaskInColumns,
		isSaving,
	}
}
