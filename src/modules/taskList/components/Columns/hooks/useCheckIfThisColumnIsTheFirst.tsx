import { useColumnList } from '@/modules/taskList/components/Columns/hooks/useColumnList'
import { Column } from '../model/column'
import { isThisTheFirstColumn } from '@/modules/taskList/components/Columns/model/isThisColumn'

export function useCheckIfThisColumnIsTheFirst(column: Column): boolean {
	const columnList = useColumnList()
	return isThisTheFirstColumn(column, columnList)
}
