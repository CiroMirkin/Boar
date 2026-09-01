import BusinessError from '@/common/errors/businessError'
import { TaskBoard } from '@/modules/TaskBoard/model/taskBoard'
import { TaskList } from '@/modules/TaskBoard/model/TaskList'

export type TaskListInEachColumn = TaskList[]
export const emptyTaskListInEachColumn: TaskListInEachColumn = [[], [], []]

export const isThisArrayOfTypeTaskListInEachColumn = (a: TaskListInEachColumn | TaskBoard) =>
	Array.isArray(a[0])

const TASK_LIST_LIMIT = 10

export const isThisTaskListWithinTheLimit = ({
	taskList,
}: {
	taskList: TaskList
}): true | BusinessError => {
	if (taskList.length > TASK_LIST_LIMIT) throw new BusinessError('La columna esta llena.')
	return true
}
