import { ColumnListContext } from '@/board/columnList/context/ColumnListContext'
import { Column, isThisTheFirstColumn } from '../models/column'
import { useContext } from 'react'

export function useCheckIfThisColumnIsTheFirst(column: Column): boolean {
	const columnList = useContext(ColumnListContext)
	return isThisTheFirstColumn(column, columnList)
}
