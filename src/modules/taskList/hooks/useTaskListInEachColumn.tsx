import { emptyTaskListInEachColumn, TaskListInEachColumn } from '@/modules/taskList/models/taskList'
import { useListOfTasksInColumnsQuery } from './useListOfTasksInColumnsQuery'

export const useTaskListInEachColumn = (): TaskListInEachColumn => {
	const { listOfTaskInColumns } = useListOfTasksInColumnsQuery()

	if (!listOfTaskInColumns || listOfTaskInColumns.length === 0) {
		return emptyTaskListInEachColumn
	}
	return listOfTaskInColumns.map((column) => column.tasks || [])
}
