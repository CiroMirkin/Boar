import { Column, isThisTheFirstColumn } from '../models/column'
import { useColumnList } from './useColumnList'

export function useCheckIfThisColumnIsTheFirst(column: Column): boolean {
	const columnList = useColumnList()
	return isThisTheFirstColumn(column, columnList)
}
