import { ColumnList } from '@/modules/columnList/models/columnList'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'

export const useColumnList = (): ColumnList => {
	return useSelector((state: RootState) => state.columnList.list)
}
