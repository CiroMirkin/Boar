import { useContext } from 'react'
import { taskModel } from '../../taskList/models/task'
import { getIndexOfColumnInColumnList, isThisTheLastColumn } from '../models/column'
import { ColumnListContext } from '@/board/columnList/context/ColumnListContext'

export function useCheckIfTaskIsInTheLastColumn(task: taskModel): boolean {
	const columnList = useContext(ColumnListContext)
	const columnIndex = getIndexOfColumnInColumnList(task.columnPosition)
	const column = columnList[columnIndex]
	return isThisTheLastColumn(column, columnList)
}
