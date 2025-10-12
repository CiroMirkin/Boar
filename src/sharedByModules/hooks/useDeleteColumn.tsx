import { Column, getIndexOfColumnInColumnList } from '@/modules/columnList/models/column'
import { useDispatch, useSelector } from 'react-redux'
import { setTaskListInEachColumn } from '@/modules/taskList/state/taskListInEachColumnReducer'
import { RootState } from '@/store'
import { useColumnListQuery } from '@/modules/columnList/hooks/useColumnListQuery'
import { deleteThisColumn } from '@/modules/columnList/state/actions/deleteColumn'

export const useDeleteColumn = () => {
	const updateBoardData = useDispatch()
	const { list: taskListInEachColumn } = useSelector(
		(state: RootState) => state.taskListInEachColumn
	)
	const { columnList, updateColumnList } = useColumnListQuery()
	return ({ column }: { column: Column }) => {
		const deletedColumnIndex = getIndexOfColumnInColumnList(column.position)

		// Actualizacion de las posiciones de las tareas en las columnas restantes para mantener la consistencia de los datos.
		const newTaskListInEachColumn = taskListInEachColumn
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
		updateBoardData(setTaskListInEachColumn(newTaskListInEachColumn))
	}
}
