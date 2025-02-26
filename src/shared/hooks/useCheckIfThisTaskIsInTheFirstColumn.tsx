import { taskModel } from '../../modules/taskList/models/task'
import { getIndexOfColumnInColumnList, isThisTheFirstColumn } from '../../modules/columnList/models/column'
import { useColumnList } from '../../modules/columnList/hooks/useColumnList'

export function useCheckIfThisTaskIsInTheFirstColumn(task: taskModel): boolean {
	const columnList = useColumnList()
	const columnIndex = getIndexOfColumnInColumnList(task.columnPosition)
	const column = columnList[columnIndex]
	return isThisTheFirstColumn(column, columnList)
}
