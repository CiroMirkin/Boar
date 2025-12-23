import { TaskBoard } from '@/modules/TaskBoard/model/taskBoard'
import { getNewTaskColumn } from '@/modules/TaskBoard/model/taskColumn'

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
