import { Column } from '../models/column'
import { useColumnListQuery } from './useColumnListQuery'

export const useColumnList = (): Column[] => {
	const columnList = useColumnListQuery().columnList || []
	return columnList
}
