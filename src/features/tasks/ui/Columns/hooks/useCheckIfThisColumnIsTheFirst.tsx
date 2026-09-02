import { useColumnList } from '@/features/tasks/ui/Columns/hooks/useColumnList'
import { Column } from '../model/column'
import { isThisTheFirstColumn } from '@/features/tasks/ui/Columns/model/isThisColumn'

export function useCheckIfThisColumnIsTheFirst(column: Column): boolean {
	const columnList = useColumnList()
	return isThisTheFirstColumn(column, columnList)
}
