import { TaskListInEachColumn } from '@/modules/taskList/models/taskList'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'

export const useTaskListInEachColumn = (): TaskListInEachColumn => {
	return useSelector((state: RootState) => state.taskListInEachColumn.list)
}
