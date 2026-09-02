import { TaskBoard } from '@/features/tasks/model/taskBoard'
import { getNewTaskColumn } from '@/features/tasks/model/taskColumn'

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
