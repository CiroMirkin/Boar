import { TaskListInEachColumn } from '@/modules/taskList/models/taskList'
import { useListOfTasksInColumnsQuery } from './useListOfTasksInColumnsQuery'

export const useTaskListInEachColumn = (): TaskListInEachColumn => {
	const { listOfTaskInColumns } = useListOfTasksInColumnsQuery()
	return listOfTaskInColumns
}
