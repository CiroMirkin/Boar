import { useListOfTasksInColumnsQuery } from '@/modules/taskList/hooks/useListOfTasksInColumnsQuery'
import { taskModel } from '@/modules/TaskBoard/model/task'

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
