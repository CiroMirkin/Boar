import { getIndexOfColumnInColumnList } from '../../../columnList/models/column'
import { taskUseCaseParams } from '../actions'
import { TaskList } from '@/board/taskList/models/taskList'

export function deleteThisTask({ taskListInEachColumn, task }: taskUseCaseParams): TaskList[] {
	const taskId = task.id
	const columnIndex = getIndexOfColumnInColumnList(task.columnPosition)

	const newTaskListInEachColumn = taskListInEachColumn.map((taskList, index) => {
		if (index === columnIndex) {
			const newTaskListInColumn = taskList.filter((task) => task.id !== taskId)
			return newTaskListInColumn
		}
		return taskList
	})

	return newTaskListInEachColumn
}
