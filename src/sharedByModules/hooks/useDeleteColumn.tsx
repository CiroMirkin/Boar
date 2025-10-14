import { Column, getIndexOfColumnInColumnList } from '@/modules/columnList/models/column'
import { useColumnListQuery } from '@/modules/columnList/hooks/useColumnListQuery'
import { deleteThisColumn } from '@/modules/columnList/state/actions/deleteColumn'
import { useListOfTasksInColumnsQuery } from '@/modules/taskList/hooks/useListOfTasksInColumnsQuery'

export const useDeleteColumn = () => {
	const { listOfTaskInColumns, updateListOfTaskInColumns } = useListOfTasksInColumnsQuery()
	const { columnList, updateColumnList } = useColumnListQuery()

	return ({ column }: { column: Column }) => {
		const deletedColumnIndex = getIndexOfColumnInColumnList(column.position)

		// Actualizacion de las posiciones de las tareas en las columnas restantes para mantener la consistencia de los datos.
		const newTaskListInEachColumn = (listOfTaskInColumns || [])
			.filter((_, index) => index !== deletedColumnIndex)
			.map((taskList) => {
				return taskList.map((task) => {
					const taskColumnPosition = Number(task.columnPosition)
					if (taskColumnPosition > deletedColumnIndex) {
						return {
							...task,
							columnPosition: String(taskColumnPosition - 1),
						}
					}
					return task
				})
			})

		const updatedColumnList = deleteThisColumn({
			columnList: columnList || [],
			column,
		})
		updateColumnList(updatedColumnList)
		updateListOfTaskInColumns(newTaskListInEachColumn)
	}
}
