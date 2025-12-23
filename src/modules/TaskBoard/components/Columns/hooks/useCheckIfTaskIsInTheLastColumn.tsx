import { taskModel } from '@/modules/TaskBoard/model/task'
import { useTaskBoardQuery } from '@/modules/TaskBoard/hooks/useTaskBoardQuery'

export function useCheckIfTaskIsInTheLastColumn(task: taskModel): boolean {
	const { taskBoard } = useTaskBoardQuery()
	const tasklists = taskBoard.map((list) => list.tasks)
	const taskColumnIndex = tasklists.findIndex((taskList) =>
		taskList.some((t) => t.id === task.id)
	)

	if (taskColumnIndex === -1) return false
	return taskColumnIndex === tasklists.length - 1
}
