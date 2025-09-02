import { taskModel } from '../../modules/taskList/models/task'
import {
	getIndexOfColumnInColumnList,
	isThisTheLastColumn,
} from '../../modules/columnList/models/column'
import { useColumnList } from '../../modules/columnList/hooks/useColumnList'

export function useCheckIfTaskIsInTheLastColumn(task: taskModel): boolean {
	const columnList = useColumnList()
	const columnIndex = getIndexOfColumnInColumnList(task.columnPosition)
	const column = columnList[columnIndex]
	return isThisTheLastColumn(column, columnList)
}
