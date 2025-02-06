import { Column, isThisTheLastColumn } from '../models/column'
import { useColumnList } from './useColumnList'

export function useCheckIfThisColumnIsTheLast(column: Column): boolean {
	const columnList = useColumnList()
	return isThisTheLastColumn(column, columnList)
}
