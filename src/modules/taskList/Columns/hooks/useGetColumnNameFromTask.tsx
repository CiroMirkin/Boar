import { useListOfTasksInColumnsQuery } from '../../hooks/useListOfTasksInColumnsQuery'
import { taskModel } from '../../models/task'

export const useGetColumnNameFromTask = (): ((task: taskModel) => string) => {
	const { listOfTaskInColumns } = useListOfTasksInColumnsQuery()

	return (task: taskModel) => {
		const columnIndex = listOfTaskInColumns.findIndex((column) =>
			column.tasks.some((t) => t.id === task.id)
		)
		if (columnIndex === -1) return ''
		return listOfTaskInColumns[columnIndex].status
	}
}
