import { TaskListInEachColumn } from '@/pages/board/models/taskList'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'

export const useTaskListInEachColumn = (): TaskListInEachColumn => {
	return useSelector((state: RootState) => state.taskListInEachColumn.list)
}
