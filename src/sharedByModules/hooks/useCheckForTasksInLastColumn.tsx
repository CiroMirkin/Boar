import { RootState } from '@/store'
import { useSelector } from 'react-redux'

export const useCheckForTasksInLastColumn = (): boolean => {
	const taskListInEachColumn = useSelector((state: RootState) => state.taskListInEachColumn.list)
	const taskListInTheLastColumn = taskListInEachColumn[taskListInEachColumn.length - 1]
	return !taskListInTheLastColumn.length
}
