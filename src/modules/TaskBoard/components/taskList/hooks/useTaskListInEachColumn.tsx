import {
	emptyTaskListInEachColumn,
	TaskListInEachColumn,
} from '@/modules/TaskBoard/components/taskList/models/taskList'
import { useTaskBoardQuery } from '@/modules/TaskBoard/hooks/useTaskBoardQuery'

export const useTaskListInEachColumn = (): TaskListInEachColumn => {
	const { taskBoard } = useTaskBoardQuery()

	if (!taskBoard || taskBoard.length === 0) {
		return emptyTaskListInEachColumn
	}
	return taskBoard.map((column) => column.tasks || [])
}
