import { TaskColumn } from './taskColumn'
import { TaskListInEachColumn as TaskLists } from '@/modules/TaskBoard/components/taskList/models/taskListInEachColumn'

export type TaskBoard = TaskColumn[]

export const DEFAULT_COLUMN_IDS = ['c1', 'c2', 'c3']

export const emptyTaskBoard: TaskBoard = [
	{
		id: DEFAULT_COLUMN_IDS[0],
		status: `default_columns.${DEFAULT_COLUMN_IDS[0]}`,
		tasks: [],
	},
	{
		id: DEFAULT_COLUMN_IDS[1],
		status: `default_columns.${DEFAULT_COLUMN_IDS[1]}`,
		tasks: [],
	},
	{
		id: DEFAULT_COLUMN_IDS[2],
		status: `default_columns.${DEFAULT_COLUMN_IDS[2]}`,
		tasks: [],
	},
]

export const isDefaultTaskBoard = (taskBoard: TaskBoard): boolean => {
	if (taskBoard.length !== emptyTaskBoard.length) {
		return false
	}
	return taskBoard.every(
		(column, index) =>
			column.id === emptyTaskBoard[index].id && column.status === emptyTaskBoard[index].status
	)
}

export const joinTaskListsAndTaskBoard = (
	taskLists: TaskLists,
	taskBoard: TaskBoard
): TaskBoard => {
	return taskBoard.map((column, index) => {
		return {
			...column,
			tasks: taskLists[index] || [],
		}
	})
}
