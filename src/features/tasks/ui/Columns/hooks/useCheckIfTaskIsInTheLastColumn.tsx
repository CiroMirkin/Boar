import { taskModel } from '@/features/tasks/model/task'
import { useTaskBoardQuery } from '@/features/tasks/hooks/useTaskBoardQuery'

export function useCheckIfTaskIsInTheLastColumn(task: taskModel): boolean {
	const { taskBoard } = useTaskBoardQuery()
	const tasklists = taskBoard.map((list) => list.tasks)
	const taskColumnIndex = tasklists.findIndex((taskList) =>
		taskList.some((t) => t.id === task.id)
	)

	if (taskColumnIndex === -1) return false
	return taskColumnIndex === tasklists.length - 1
}
