import { TaskListInEachColumn } from '@/modules/TaskBoard/components/taskList/models/taskList'
import { TaskBoard } from '@/modules/TaskBoard/model/taskBoard'

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

interface deleteTheTaskColumnParams {
	id: string
	taskBoard: TaskBoard
}

export const deleteThisTaskColumn = ({ id, taskBoard }: deleteTheTaskColumnParams): TaskBoard => {
	return taskBoard.filter((taskColumn) => taskColumn.id !== id)
}
