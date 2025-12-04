import { TaskListInEachColumn } from '@/modules/taskList/models/taskList'
import { TaskList } from '../../TaskBoard/model/TaskList'
import { findTaskColumnIndex } from './moveTask'
import { taskModel } from '../../TaskBoard/model/task'

interface DeleteThisTaskParams {
	taskListInEachColumn: TaskListInEachColumn
	task: taskModel
}

export function deleteThisTask({ taskListInEachColumn, task }: DeleteThisTaskParams): TaskList[] {
	const taskId = task.id
	const columnIndex = findTaskColumnIndex(taskListInEachColumn, task.id)

	const newTaskListInEachColumn = taskListInEachColumn.map((taskList, index) => {
		if (index === columnIndex) {
			const newTaskListInColumn = taskList.filter((task) => task.id !== taskId)
			return newTaskListInColumn
		}
		return taskList
	})

	return newTaskListInEachColumn
}
