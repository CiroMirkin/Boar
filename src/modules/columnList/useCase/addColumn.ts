import { isItWithinTheLimitOfColumns } from '@/modules/columnList/models/columnList'
import { columnUseCaseParams } from './actions'
import { Column } from '../models/column'

export function addColumnAtTheEnd({ columnList, column }: columnUseCaseParams): Column[] {
	const nextPosition = column.position === '-1' ? String(columnList.length + 1) : column.position

	const newColumn: Column = {
		...column,
		position: nextPosition,
	}
	const newColumnList = [...columnList, newColumn]
	isItWithinTheLimitOfColumns(newColumnList)

	return newColumnList
}
