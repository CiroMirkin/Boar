import { isItWithinTheLimitOfColumns } from '@/models/columnList'
import { columnUseCaseParams } from '../useCase'
import { Column } from '@/models/column'

export function addColumnAtTheEnd({ columnList, column }: columnUseCaseParams): Column[] {
	if (column.position === '-1') {
		column.position = JSON.stringify(columnList.length + 1)
	}
	columnList.push(column)
	isItWithinTheLimitOfColumns(columnList)
	return columnList
}
