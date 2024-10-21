import { columnUseCaseParams } from '../useCase'
import { Column, isThisColumnNameValid } from '../../models/column'

interface changeNameOfColumnParams extends columnUseCaseParams {
	newName: string
}

export function changeNameOfColumn({
	columnList,
	column,
	newName,
}: changeNameOfColumnParams): Column[] {
	isThisColumnNameValid(newName)
	const newColumnList = columnList.map((columnInBoard) => {
		if (columnInBoard.id === column.id) {
			columnInBoard.name = newName
		}
		return columnInBoard
	})
	return newColumnList
}
