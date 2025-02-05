import { TaskListInEachColumn } from '@/pages/board/taskList/models/taskList'

interface deleteLastTaskListParams {
	taskListInEachColumn: TaskListInEachColumn
}

export const cleanLastTaskList = ({
	taskListInEachColumn,
}: deleteLastTaskListParams): TaskListInEachColumn => {
	if (taskListInEachColumn.length > 1) {
		taskListInEachColumn[taskListInEachColumn.length - 1] = []
	}
	return taskListInEachColumn
}

interface deleteTheTaskListInThisIndexParams {
	index: number
	taskListInEachColumn: TaskListInEachColumn
}

export const deleteTheTaskListInThisIndex = ({
	index,
	taskListInEachColumn,
}: deleteTheTaskListInThisIndexParams): TaskListInEachColumn => {
	const newTaskListInEachColumn = taskListInEachColumn.filter(
		(taskList) => taskListInEachColumn.indexOf(taskList) !== index
	)
	return newTaskListInEachColumn
}
