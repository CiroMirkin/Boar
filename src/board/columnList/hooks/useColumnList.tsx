import { ColumnList } from '@/board/columnList/models/columnList'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'

export const useColumnList = (): ColumnList => {
	return useSelector((state: RootState) => state.columnList.list)
}
