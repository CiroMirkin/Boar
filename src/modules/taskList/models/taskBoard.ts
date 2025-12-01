import BusinessError from '@/sharedByModules/errors/businessError'
import { TaskColumn } from './taskColumn'
import { TaskListInEachColumn as TaskLists } from './taskList'

export type TaskBoard = TaskColumn[]

export const emptyTaskBoard: TaskBoard = [
	{
		id: 'c1',
		status: 'default_columns.c1',
		tasks: [],
	},
	{
		id: 'c2',
		status: 'default_columns.c2',
		tasks: [],
	},
	{
		id: 'c3',
		status: 'default_columns.c3',
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

const LIMIT_OF_COLUMNS = 6

export const isItWithinTheLimitOfColumns = (taskBoard: TaskBoard): true | BusinessError => {
	if (taskBoard.length > LIMIT_OF_COLUMNS)
		throw new BusinessError('Alcanzaste el limite de columnas.')
	return true
}
