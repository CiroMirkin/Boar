import { useColumnList } from '@/modules/taskList/Columns/hooks/useColumnList'
import { Column } from '../model/column'
import { isThisTheFirstColumn } from '@/modules/taskList/Columns/model/isThisColumn'

export function useCheckIfThisColumnIsTheFirst(column: Column): boolean {
	const columnList = useColumnList()
	return isThisTheFirstColumn(column, columnList)
}
