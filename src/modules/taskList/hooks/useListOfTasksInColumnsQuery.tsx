import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchTaskListInEachColumn, saveTaskListInEachColumn } from '../repository'
import { useSession } from '@/auth/hooks/useSession'
import { TaskListInEachColumn } from '../models/taskList'

const taskListInEachColumnsQueryKey = ['taskListInEachColumns']

export const useListOfTasksInColumnsQuery = () => {
	const { session } = useSession()
	const queryClient = useQueryClient()

	const {
		data: taskListInEachColumn,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: [...taskListInEachColumnsQueryKey, session?.user.id],
		queryFn: () => fetchTaskListInEachColumn(session),
	})
	const { mutate: updateTaskListInEachColumn, isPending: isSaving } = useMutation({
		mutationFn: (updatedTaskListInEachColumn: TaskListInEachColumn) =>
			saveTaskListInEachColumn({
				taskListInEachColumn: updatedTaskListInEachColumn,
				session,
			}),
		onMutate: async (updatedTaskListInEachColumn: TaskListInEachColumn) => {
			await queryClient.cancelQueries({ queryKey: taskListInEachColumnsQueryKey })
			const previousTaskListInEachColumn = queryClient.getQueryData(
				taskListInEachColumnsQueryKey
			)
			queryClient.setQueryData(taskListInEachColumnsQueryKey, updatedTaskListInEachColumn)
			return { previousTaskListInEachColumn }
		},
		onError: (_err, _newTaskListInEachColumn, context) => {
			if (context?.previousTaskListInEachColumn) {
				queryClient.setQueryData(
					taskListInEachColumnsQueryKey,
					context.previousTaskListInEachColumn
				)
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: taskListInEachColumnsQueryKey })
		},
	})

	return {
		taskListInEachColumn,
		isLoading,
		isError,
		error,
		updateTaskListInEachColumn,
		isSaving,
	}
}
