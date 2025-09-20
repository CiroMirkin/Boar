import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import { Column } from '../models/column'

export const useColumnList = (): Column[] => {
	const columnList = useSelector((state: RootState) => state.columnList.list)
	return columnList
}
