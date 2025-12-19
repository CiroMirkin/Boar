import { useTaskBoardQuery } from '@/modules/TaskBoard/hooks/useTaskBoardQuery'

export const useCheckForTasksInLastColumn = (): boolean => {
	const { taskBoard } = useTaskBoardQuery()
	const taskListInEachColumn = taskBoard.map((list) => list.tasks)
	const taskListInTheLastColumn = taskListInEachColumn[taskListInEachColumn.length - 1]
	return !taskListInTheLastColumn.length
}
