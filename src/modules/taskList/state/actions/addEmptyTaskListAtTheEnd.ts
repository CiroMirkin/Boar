import { TaskListInEachColumn } from '../../models/taskList'

export const addEmptyTaskListAtTheEnd = ({
	listOfTaskInColumns,
}: {
	listOfTaskInColumns: TaskListInEachColumn
}): TaskListInEachColumn => {
	listOfTaskInColumns.push([])
	return listOfTaskInColumns
}
