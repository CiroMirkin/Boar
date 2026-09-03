import { TaskListInEachColumn } from '../models/taskListInEachColumn'

export const addEmptyTaskListAtTheEnd = ({
	listOfTaskInColumns,
}: {
	listOfTaskInColumns: TaskListInEachColumn
}): TaskListInEachColumn => {
	listOfTaskInColumns.push([])
	return listOfTaskInColumns
}
