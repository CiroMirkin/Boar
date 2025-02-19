import { taskModel } from '../taskList/models/task'
import { getIndexOfColumnInColumnList, isThisTheLastColumn } from '../models/column'
import { useColumnList } from './useColumnList'

export function useCheckIfTaskIsInTheLastColumn(task: taskModel): boolean {
	const columnList = useColumnList()
	const columnIndex = getIndexOfColumnInColumnList(task.columnPosition)
	const column = columnList[columnIndex]
	return isThisTheLastColumn(column, columnList)
}
