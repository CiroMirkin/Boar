// addTask.ts
import {
	TaskListInEachColumn,
	isThisTaskListWithinTheLimit,
} from '@/modules/taskList/models/taskList'
import { taskUseCaseParams } from '../actions'
import { getIndexOfColumnInColumnList } from '../../../columnList/models/column'

export function addTaskInFirstColumn({
	taskListInEachColumn: taskList,
	task,
}: taskUseCaseParams): TaskListInEachColumn {
	const columnPosition = 0

	const newTaskList: TaskListInEachColumn = taskList.map((column, index) => {
		if (index === columnPosition) {
			return [...column, task]
		}
		return [...column]
	})

	isThisTaskListWithinTheLimit({ taskList: newTaskList[columnPosition] })

	return newTaskList
}

export function addTaskInTheLastColumn({
	taskListInEachColumn,
	task,
}: taskUseCaseParams): TaskListInEachColumn {
	const columnIndex = getIndexOfColumnInColumnList(task.columnPosition)

	const newTaskList: TaskListInEachColumn = taskListInEachColumn.map((column, index) => {
		if (index === columnIndex) {
			return [...column, task]
		}
		return [...column]
	})

	return newTaskList
}
