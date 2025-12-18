import { taskModel } from '@/modules/TaskBoard/model/task'
import { useTaskListInEachColumn } from '@/modules/TaskBoard/components/taskList/hooks/useTaskListInEachColumn'

export function useCheckIfTaskIsInTheLastColumn(task: taskModel): boolean {
	const tasklists = useTaskListInEachColumn()
	const taskColumnIndex = tasklists.findIndex((taskList) =>
		taskList.some((t) => t.id === task.id)
	)
	if (taskColumnIndex === -1) return false
	return taskColumnIndex === tasklists.length - 1
}
