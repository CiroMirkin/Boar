import { TaskBoard } from '../models/taskBoard'
import { getNewTaskColumn } from '../models/taskColumn'

interface addNewTaskColumnParams {
	taskBoard: TaskBoard
	status: string
}

export const addNewTaskColumn = ({ status, taskBoard }: addNewTaskColumnParams): TaskBoard => {
	const newTaskColumn = getNewTaskColumn(status)
	if (newTaskColumn) {
		return [...taskBoard, newTaskColumn]
	}
	return taskBoard
}
