import { taskModel } from '@/modules/taskList/models/task'
import { useTaskListInEachColumn } from '@/modules/taskList/hooks/useTaskListInEachColumn'

export function useCheckIfTaskIsInTheLastColumn(task: taskModel): boolean {
	const tasklists = useTaskListInEachColumn()
	const taskColumnIndex = tasklists.findIndex((taskList) =>
		taskList.some((t) => t.id === task.id)
	)
	if (taskColumnIndex === -1) return false
	return taskColumnIndex === tasklists.length - 1
}
