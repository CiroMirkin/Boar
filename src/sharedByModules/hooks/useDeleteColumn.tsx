import { Column } from '@/modules/columnList/models/column'
import { useDispatch } from 'react-redux'
import { deleteTheTaskListOfThisColumn } from '@/modules/taskList/state/taskListInEachColumnReducer'
import { deleteColumn } from '@/modules/columnList/state/columnListReducer'

export const useDeleteColumn = () => {
	const updateBoardData = useDispatch()
	return ({ column }: { column: Column }) => {
		updateBoardData(deleteColumn(column))
		updateBoardData(deleteTheTaskListOfThisColumn(column))
	}
}
