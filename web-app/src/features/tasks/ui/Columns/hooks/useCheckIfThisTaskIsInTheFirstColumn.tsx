import { taskModel } from '@/features/tasks/model/task'
import { useTaskBoardQuery } from '@/features/tasks/hooks/useTaskBoardQuery'

export function useCheckIfThisTaskIsInTheFirstColumn(task: taskModel): boolean {
	const { taskBoard } = useTaskBoardQuery()
	if (!taskBoard) return false
	const taskColumnIndex = taskBoard.findIndex((column) =>
		column.tasks.some((t) => t.id === task.id)
	)
	if (taskColumnIndex === -1) return false
	return taskColumnIndex === 0
}
