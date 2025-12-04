import { taskModel } from '@/modules/TaskBoard/model/task'
import { useTaskBoardQuery } from '@/modules/TaskBoard/hooks/useTaskBoardQuery'

export function useCheckIfThisTaskIsInTheFirstColumn(task: taskModel): boolean {
	const { taskBoard } = useTaskBoardQuery()
	const taskColumnIndex = taskBoard.findIndex((column) =>
		column.tasks.some((t) => t.id === task.id)
	)
	if (taskColumnIndex === -1) return false
	return taskColumnIndex === 0
}
