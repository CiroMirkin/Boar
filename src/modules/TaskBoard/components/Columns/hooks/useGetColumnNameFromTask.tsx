import { useTaskBoardQuery } from '@/modules/TaskBoard/hooks/useTaskBoardQuery'
import { taskModel } from '@/modules/TaskBoard/model/task'

export const useGetColumnNameFromTask = (): ((task: taskModel) => string) => {
	const { taskBoard } = useTaskBoardQuery()

	return (task: taskModel) => {
		const columnIndex = taskBoard.findIndex((column) =>
			column.tasks.some((t) => t.id === task.id)
		)
		if (columnIndex === -1) return ''
		return taskBoard[columnIndex].status
	}
}
