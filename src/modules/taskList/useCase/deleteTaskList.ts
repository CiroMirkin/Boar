import { TaskListInEachColumn } from '@/modules/taskList/models/taskList'

interface deleteLastTaskListParams {
	taskListInEachColumn: TaskListInEachColumn
}

export const cleanLastTaskList = ({
	taskListInEachColumn,
}: deleteLastTaskListParams): TaskListInEachColumn => {
	if (taskListInEachColumn.length <= 1) {
		return taskListInEachColumn.map((column) => [...column])
	}

	const lastColumnIndex = taskListInEachColumn.length - 1

	return taskListInEachColumn.map((column, index) => {
		if (index === lastColumnIndex) {
			return []
		}
		return [...column]
	})
}

interface deleteTheTaskListInThisIndexParams {
	index: number
	taskListInEachColumn: TaskListInEachColumn
}

export const deleteTheTaskListInThisIndex = ({
	index,
	taskListInEachColumn,
}: deleteTheTaskListInThisIndexParams): TaskListInEachColumn => {
	return taskListInEachColumn
		.filter((_, currentIndex) => currentIndex !== index)
		.map((column) => [...column])
}
