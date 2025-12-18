import { taskModel } from '@/modules/TaskBoard/model/task'
import { isThisTaskListWithinTheLimit, TaskListInEachColumn } from '../models/taskList'
import { deleteThisTask } from './deleteTask'

export interface DataOfTheTaskForMoveIt {
	task: taskModel
	newColumnPosition: string
}

interface Params {
	taskListOfColumns: TaskListInEachColumn
	task: taskModel
	newColumnPosition: string
}

export const moveThisTaskToThisColumn = (params: Params): TaskListInEachColumn => {
	const { taskListOfColumns, task, newColumnPosition } = params

	const newTaskListOfColumns = deleteThisTask({
		taskListInEachColumn: taskListOfColumns,
		task,
	})

	const indexOfTheNewTaskColumn = parseInt(newColumnPosition) - 1
	const canMoveTheTask = isThisTaskListWithinTheLimit({
		taskList: newTaskListOfColumns[indexOfTheNewTaskColumn],
	})

	if (canMoveTheTask) {
		const movingTask: taskModel = {
			...task,
		}
		newTaskListOfColumns[indexOfTheNewTaskColumn].unshift(movingTask)

		return newTaskListOfColumns
	}
	return taskListOfColumns
}
