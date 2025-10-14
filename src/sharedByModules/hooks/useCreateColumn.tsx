import { Column } from '@/modules/columnList/models/column'
import { useColumnListQuery } from '@/modules/columnList/hooks/useColumnListQuery'
import { addColumnAtTheEnd } from '@/modules/columnList/state/actions/addColumn'
import { useListOfTasksInColumnsQuery } from '@/modules/taskList/hooks/useListOfTasksInColumnsQuery'
import { addEmptyTaskListAtTheEnd } from '@/modules/taskList/state/actions/addEmptyTaskListAtTheEnd'

export const useCreateColumn = () => {
	const { columnList, updateColumnList } = useColumnListQuery()
	const { listOfTaskInColumns, updateListOfTaskInColumns } = useListOfTasksInColumnsQuery()
	return ({ newColumn }: { newColumn: Column }) => {
		const updatedColumnList = addColumnAtTheEnd({
			column: newColumn,
			columnList: columnList || [],
		})
		const updatedListOfTasksInColumns = addEmptyTaskListAtTheEnd({
			listOfTaskInColumns: listOfTaskInColumns || [],
		})

		updateColumnList(updatedColumnList)
		updateListOfTaskInColumns(updatedListOfTasksInColumns)
	}
}
