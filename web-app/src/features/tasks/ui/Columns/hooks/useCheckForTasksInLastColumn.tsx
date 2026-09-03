import { useTaskBoardQuery } from '@/features/tasks/hooks/useTaskBoardQuery'

export const useCheckForTasksInLastColumn = (): boolean => {
	const { taskBoard } = useTaskBoardQuery()
	if (!taskBoard) return false
	const taskListInEachColumn = taskBoard.map((list) => list.tasks)
	const taskListInTheLastColumn = taskListInEachColumn[taskListInEachColumn.length - 1]
	return !taskListInTheLastColumn.length
}
