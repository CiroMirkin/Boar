import { useDispatch } from 'react-redux'
import { addEmptyTaskListAtTheEnd } from '@/modules/taskList/state/taskListInEachColumnReducer'
import { Column } from '@/modules/columnList/models/column'
import { useColumnListQuery } from '@/modules/columnList/hooks/useColumnListQuery'
import { addColumnAtTheEnd } from '@/modules/columnList/state/actions/addColumn'

export const useCreateColumn = () => {
	const updateBoardData = useDispatch()
	const { columnList, updateColumnList } = useColumnListQuery()
	return ({ newColumn }: { newColumn: Column }) => {
		const updatedColumnList = addColumnAtTheEnd({
			column: newColumn,
			columnList: columnList || [],
		})
		updateColumnList(updatedColumnList)
		updateBoardData(addEmptyTaskListAtTheEnd())
	}
}
