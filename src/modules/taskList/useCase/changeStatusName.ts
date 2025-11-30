import { TaskBoard } from '../models/taskBoard'

interface changeStatusNameParams {
	newName: string
	taskBoard: TaskBoard
	id: string
}

export const changeStatusName = ({ newName, taskBoard, id }: changeStatusNameParams): TaskBoard => {
	return taskBoard.map((taskColumn) => {
		if (taskColumn.id === id) {
			return {
				...taskColumn,
				status: newName,
			}
		}
		return taskColumn
	})
}
