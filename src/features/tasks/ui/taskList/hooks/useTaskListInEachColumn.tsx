import {
	emptyTaskListInEachColumn,
	TaskListInEachColumn,
} from '@/features/tasks/ui/taskList/models/taskListInEachColumn'
import { useTaskBoardQuery } from '@/features/tasks/hooks/useTaskBoardQuery'

export const useTaskListInEachColumn = (): TaskListInEachColumn => {
	const { taskBoard } = useTaskBoardQuery()

	if (!taskBoard || taskBoard.length === 0) {
		return emptyTaskListInEachColumn
	}
	return taskBoard.map((column) => column.tasks || [])
}
