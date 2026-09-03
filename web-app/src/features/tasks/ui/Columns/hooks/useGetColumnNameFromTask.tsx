import { useTaskBoardQuery } from '@/features/tasks/hooks/useTaskBoardQuery'
import { taskModel } from '@/features/tasks/model/task'

export const useGetColumnNameFromTask = (): ((task: taskModel) => string) => {
	const { taskBoard } = useTaskBoardQuery()

	return (task: taskModel) => {
		if (!taskBoard) return ''
		const columnIndex = taskBoard.findIndex((column) =>
			column.tasks.some((t) => t.id === task.id)
		)
		if (columnIndex === -1) return ''
		return taskBoard[columnIndex].status
	}
}
