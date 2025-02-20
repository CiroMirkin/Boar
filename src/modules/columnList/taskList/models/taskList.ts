import BusinessError from '@/modules/shared/errors/businessError'
import { taskModel } from './task'

export type TaskList = taskModel[]
/**
 * Cada arreglo de tareas aquí guardado tiene su correspondiente columna en el arreglo ColumnList. El primer arreglo de tareas corresponde a la primer columna del arreglo ColumnList y asi sucesivamente.
 *
 * Estos dos arreglos deben mantener una consistencia, si hay mas o menos elementos en alguno de los dos arreglos habrá errores.
 */
export type TaskListInEachColumn = TaskList[]

export const emptyTaskListInEachColumn: TaskListInEachColumn = [[], [], []]

const TASK_LIST_LIMIT = 10
const LAST_TASK_LIST_LIMIT = 30 // Deberia ser igual a la constante dailyArchiveLimit
const FIRST_TASK_LIST_LIMIT = 30

export const isThisTaskListWithinTheLimit = ({
	taskList,
}: {
	taskList: TaskList
}): true | BusinessError => {
	if (taskList.length > TASK_LIST_LIMIT) throw new BusinessError('La columna esta llena.')
	return true
}

export const isThisFirstTaskListWithinTheLimit = ({
	taskList,
}: {
	taskList: TaskList
}): true | BusinessError => {
	if (taskList.length > FIRST_TASK_LIST_LIMIT) throw new BusinessError('La columna esta llena.')
	return true
}

export const isThisLastTaskListWithinTheLimit = ({
	taskList,
}: {
	taskList: TaskList
}): true | BusinessError => {
	if (taskList.length > LAST_TASK_LIST_LIMIT) throw new BusinessError('La columna esta llena.')
	return true
}
