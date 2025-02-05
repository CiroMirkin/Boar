import { ColumnListContext } from '@/pages/board/columnList/context/ColumnListContext'
import { Column, isThisTheLastColumn } from '@/models/column'
import { useContext } from 'react'

export function useCheckIfThisColumnIsTheLast(column: Column): boolean {
	const columnList = useContext(ColumnListContext)
	return isThisTheLastColumn(column, columnList)
}
