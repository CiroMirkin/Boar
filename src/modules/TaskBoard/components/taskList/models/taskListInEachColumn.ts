import BusinessError from '@/common/errors/businessError'
import { TaskBoard } from '@/modules/TaskBoard/model/taskBoard'
import { TaskList } from '@/modules/TaskBoard/model/TaskList'

export type TaskListInEachColumn = TaskList[]
export const emptyTaskListInEachColumn: TaskListInEachColumn = [[], [], []]

export const isThisArrayOfTypeTaskListInEachColumn = (a: TaskListInEachColumn | TaskBoard) =>
	Array.isArray(a[0])

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
