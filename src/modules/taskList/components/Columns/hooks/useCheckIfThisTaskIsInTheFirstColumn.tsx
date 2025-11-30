import { taskModel } from '@/modules/taskList/models/task'
import { useListOfTasksInColumnsQuery } from '@/modules/taskList/hooks/useListOfTasksInColumnsQuery'

export function useCheckIfThisTaskIsInTheFirstColumn(task: taskModel): boolean {
	const { listOfTaskInColumns } = useListOfTasksInColumnsQuery()
	const taskColumnIndex = listOfTaskInColumns.findIndex((column) =>
		column.tasks.some((t) => t.id === task.id)
	)
	if (taskColumnIndex === -1) return false
	return taskColumnIndex === 0
}
