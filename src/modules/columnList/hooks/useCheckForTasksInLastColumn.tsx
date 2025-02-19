import { TaskListInEachColumnContext } from '@/modules/columnList/taskList/contexts/TaskListInEachColumnContext'
import { useContext } from 'react'

export const useCheckForTasksInLastColumn = (): boolean => {
	const taskListInEachColumn = useContext(TaskListInEachColumnContext)
	const taskListInTheLastColumn = taskListInEachColumn[taskListInEachColumn.length - 1]
	return !taskListInTheLastColumn.length
}
