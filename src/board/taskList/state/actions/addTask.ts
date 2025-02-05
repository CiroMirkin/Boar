import { TaskListInEachColumn, isThisTaskListWithinTheLimit } from '@/board/taskList/models/taskList'
import { taskUseCaseParams } from '../../../../redux/useCase'
import { getIndexOfColumnInColumnList } from '../../../columnList/models/column'

export function addTaskInFirstColumn({
	taskListInEachColumn: taskList,
	task,
}: taskUseCaseParams): TaskListInEachColumn {
	const columnPosition = 0
	taskList[columnPosition].push(task)

	isThisTaskListWithinTheLimit({ taskList: taskList[columnPosition] })

	return taskList
}

export function addTaskInTheLastColumn({
	taskListInEachColumn,
	task,
}: taskUseCaseParams): TaskListInEachColumn {
	const columnIndex = getIndexOfColumnInColumnList(task.columnPosition)
	taskListInEachColumn[columnIndex].push(task)
	return taskListInEachColumn
}
