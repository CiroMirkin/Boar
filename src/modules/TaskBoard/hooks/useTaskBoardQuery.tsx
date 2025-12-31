import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchTaskBoard, saveTaskBoard } from '@/modules/TaskBoard/repository'
import { useSession } from '@/auth/hooks/useSession'
import {
	isThisArrayOfTypeTaskListInEachColumn,
	TaskListInEachColumn,
} from '@/modules/TaskBoard/components/taskList/models/taskListInEachColumn'
import {
	emptyTaskBoard,
	isDefaultTaskBoard,
	joinTaskListsAndTaskBoard,
	TaskBoard,
} from '../model/taskBoard'
import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'
import { getActualBoardId } from '@/auth/utils/getActualBoardId'

const taskBoardQueryKey = ['taskBoard']

export const useTaskBoardQuery = () => {
	const { session } = useSession()
	const queryClient = useQueryClient()

	const userId = session?.user.id ?? 'guest'
	const boardId = getActualBoardId()
	const fullQueryKey = [...taskBoardQueryKey, userId, boardId] as const

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
		data: taskBoard = emptyTaskBoard,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: fullQueryKey,
		queryFn: () => fetchTaskBoard(session),
		staleTime: 30000,
		select,
	})

	const { mutate: updateTaskBoard, isPending: isSaving } = useMutation({
		mutationFn: (updatedTaskBoard: TaskListInEachColumn | TaskBoard) => {
			if (isThisArrayOfTypeTaskListInEachColumn(updatedTaskBoard)) {
				const previousTaskBoard =
					queryClient.getQueryData<TaskBoard>(fullQueryKey) ?? emptyTaskBoard
				const newUpdated = joinTaskListsAndTaskBoard(
					updatedTaskBoard as TaskListInEachColumn,
					previousTaskBoard
				)

				return saveTaskBoard({
					taskBoard: newUpdated,
					session,
				})
			}

			return saveTaskBoard({
				taskBoard: updatedTaskBoard as TaskBoard,
				session,
			})
		},
		onMutate: async (updatedTaskBoard: TaskListInEachColumn | TaskBoard) => {
			await queryClient.cancelQueries({ queryKey: fullQueryKey })
			const previousTaskBoard =
				queryClient.getQueryData<TaskBoard>(fullQueryKey) ?? emptyTaskBoard

			if (isThisArrayOfTypeTaskListInEachColumn(updatedTaskBoard)) {
				const newUpdated = joinTaskListsAndTaskBoard(
					updatedTaskBoard as TaskListInEachColumn,
					previousTaskBoard
				)
				queryClient.setQueryData(fullQueryKey, newUpdated)
				return { previousTaskBoard: previousTaskBoard }
			}

			queryClient.setQueryData(fullQueryKey, updatedTaskBoard)
			return { previousTaskBoard: previousTaskBoard }
		},
		onError: (_err, _newTaskBoard, context) => {
			if (context?.previousTaskBoard) {
				queryClient.setQueryData(fullQueryKey, context.previousTaskBoard)
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: fullQueryKey })
		},
	})

	return {
		taskBoard,
		isLoading,
		isError,
		error,
		updateTaskBoard,
		isSaving,
	}
}
