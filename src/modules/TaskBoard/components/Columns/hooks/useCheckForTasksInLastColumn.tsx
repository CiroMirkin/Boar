import { useTaskListInEachColumn } from '@/modules/TaskBoard/components/taskList/hooks/useTaskListInEachColumn'

export const useCheckForTasksInLastColumn = (): boolean => {
	const taskListInEachColumn = useTaskListInEachColumn()
	const taskListInTheLastColumn = taskListInEachColumn[taskListInEachColumn.length - 1]
	return !taskListInTheLastColumn.length
}
