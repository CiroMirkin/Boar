import BusinessError from '@/sharedByModules/errors/businessError'
import { TaskColumn } from './taskColumn'
import { TaskListInEachColumn as TaskLists } from './taskList'

export type TaskBoard = TaskColumn[]

export const emptyTaskBoard: TaskBoard = [
	{
		id: '1',
		status: 'Pendientes',
		tasks: [],
	},
	{
		id: '2',
		status: 'Procesando',
		tasks: [],
	},
	{
		id: '3',
		status: 'Terminado',
		tasks: [],
	},
]

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
