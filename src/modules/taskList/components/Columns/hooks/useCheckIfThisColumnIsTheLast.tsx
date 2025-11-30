import { useColumnList } from '@/modules/taskList/components/Columns/hooks/useColumnList'
import { Column } from '../model/column'

export function useCheckIfThisColumnIsTheLast(column: Column): boolean {
	const columnList = useColumnList()
	const columnIndex = columnList.findIndex((col) => col.id === column.id)
	if (columnIndex === -1) return false
	return columnIndex === columnList.length - 1
}
