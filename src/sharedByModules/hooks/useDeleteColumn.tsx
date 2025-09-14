import { Column, getIndexOfColumnInColumnList } from '@/modules/columnList/models/column'
import { useDispatch, useSelector } from 'react-redux'
import { setTaskListInEachColumn } from '@/modules/taskList/state/taskListInEachColumnReducer'
import { deleteColumn } from '@/modules/columnList/state/columnListReducer'
import { RootState } from '@/store'

export const useDeleteColumn = () => {
	const updateBoardData = useDispatch()
	const { list: taskListInEachColumn } = useSelector(
		(state: RootState) => state.taskListInEachColumn
	)

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

		updateBoardData(deleteColumn(column))
		updateBoardData(setTaskListInEachColumn(newTaskListInEachColumn))
	}
}
