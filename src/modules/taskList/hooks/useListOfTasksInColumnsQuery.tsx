import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchTaskListInEachColumn, saveTaskListInEachColumn } from '@/modules/TaskBoard/repository'
import { useSession } from '@/auth/hooks/useSession'
import { isThisArrayOfTypeTaskListInEachColumn, TaskListInEachColumn } from '../models/taskList'
import {
	emptyTaskBoard,
	isDefaultTaskBoard,
	joinTaskListsAndTaskBoard,
	TaskBoard,
} from '../../TaskBoard/model/taskBoard'
import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'

const taskListInEachColumnsQueryKey = ['taskListInEachColumns']

export const useListOfTasksInColumnsQuery = () => {
	const { session } = useSession()
	const queryClient = useQueryClient()

	const userId = session?.user.id ?? 'guest'
	const fullQueryKey = [...taskListInEachColumnsQueryKey, userId]

	const { t, i18n } = useTranslation()
	const select = useCallback(
		(rawData: TaskBoard | undefined) => {
			const data = rawData ?? emptyTaskBoard
			if (isDefaultTaskBoard(data)) {
				return data.map((taskColumn) => ({
					...taskColumn,
					status: t(`default_columns.${taskColumn.id}`),
				}))
			}
			return data
		},
		[t, i18n.language] // eslint-disable-line react-hooks/exhaustive-deps
	)

	const {
		data: listOfTaskInColumns = emptyTaskBoard,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: fullQueryKey,
		queryFn: () => fetchTaskListInEachColumn(session),
		placeholderData: emptyTaskBoard,
		select,
	})

	const { mutate: updateListOfTaskInColumns, isPending: isSaving } = useMutation({
		mutationFn: (updatedTaskLists: TaskListInEachColumn | TaskBoard) => {
			if (isThisArrayOfTypeTaskListInEachColumn(updatedTaskLists)) {
				const previousTaskBoard =
					queryClient.getQueryData<TaskBoard>(fullQueryKey) ?? emptyTaskBoard
				const newUpdated = joinTaskListsAndTaskBoard(
					updatedTaskLists as TaskListInEachColumn,
					previousTaskBoard
				)

				return saveTaskListInEachColumn({
					taskListInEachColumn: newUpdated,
					session,
				})
			}

			return saveTaskListInEachColumn({
				taskListInEachColumn: updatedTaskLists as TaskBoard,
				session,
			})
		},
		onMutate: async (updatedTaskLists: TaskListInEachColumn | TaskBoard) => {
			await queryClient.cancelQueries({ queryKey: fullQueryKey })
			const previousTaskBoard =
				queryClient.getQueryData<TaskBoard>(fullQueryKey) ?? emptyTaskBoard

			if (isThisArrayOfTypeTaskListInEachColumn(updatedTaskLists)) {
				const newUpdated = joinTaskListsAndTaskBoard(
					updatedTaskLists as TaskListInEachColumn,
					previousTaskBoard
				)
				queryClient.setQueryData(fullQueryKey, newUpdated)
				return { previousTaskListInEachColumn: previousTaskBoard }
			}

			queryClient.setQueryData(fullQueryKey, updatedTaskLists)
			return { previousTaskListInEachColumn: previousTaskBoard }
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
