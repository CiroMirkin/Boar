import { Column } from './column'

export const isThisTheFirstColumn = (column: Column, columnList: Column[]): boolean => {
	if (columnList[0].id === column.id) {
		return true
	}
	return false
}

export const isThisTheLastColumn = (column: Column, columnList: Column[]): boolean => {
	if (columnList[columnList.length - 1].id === column.id) {
		return true
	}
	return false
}
