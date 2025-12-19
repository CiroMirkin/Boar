import { useColumnList } from '@/modules/TaskBoard/components/Columns/hooks/useColumnList'
import { Column } from '../model/column'
import { isThisTheFirstColumn } from '@/modules/TaskBoard/components/Columns/model/isThisColumn'

export function useCheckIfThisColumnIsTheFirst(column: Column): boolean {
	const columnList = useColumnList()
	return isThisTheFirstColumn(column, columnList)
}
