import { emptyTaskListInEachColumn, TaskListInEachColumn } from '@/modules/taskList/models/taskList'
import { useListOfTasksInColumnsQuery } from './useListOfTasksInColumnsQuery'

export const useTaskListInEachColumn = (): TaskListInEachColumn => {
	const { listOfTaskInColumns } = useListOfTasksInColumnsQuery()

	if (!listOfTaskInColumns) {
		return emptyTaskListInEachColumn
	}
	return listOfTaskInColumns
}
