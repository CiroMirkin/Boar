import { taskModel } from '../taskList/models/task'
import { getIndexOfColumnInColumnList, isThisTheFirstColumn } from '../models/column'
import { useColumnList } from './useColumnList'

export function useCheckIfThisTaskIsInTheFirstColumn(task: taskModel): boolean {
	const columnList = useColumnList()
	const columnIndex = getIndexOfColumnInColumnList(task.columnPosition)
	const column = columnList[columnIndex]
	return isThisTheFirstColumn(column, columnList)
}
