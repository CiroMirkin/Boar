import { useDispatch } from 'react-redux'
import { addColumn } from '@/modules/columnList/state/columnListReducer'
import { addEmptyTaskListAtTheEnd } from '@/modules/taskList/state/taskListInEachColumnReducer'
import { Column } from '@/modules/columnList/models/column'

export const useCreateColumn = () => {
	const updateBoardData = useDispatch()
	return ({ newColumn }: { newColumn: Column }) => {
		updateBoardData(addColumn(newColumn))
		updateBoardData(addEmptyTaskListAtTheEnd())
	}
}
