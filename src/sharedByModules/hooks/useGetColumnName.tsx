import { useColumnListQuery } from '@/modules/columnList/hooks/useColumnListQuery'
import { getIndexOfColumnInColumnList } from '@/modules/columnList/models/column'

export const useGetColumnName = (): ((columnPosition: string) => string) => {
	const { columnList } = useColumnListQuery()

	return (position: string) => {
		if (!columnList) return ''
		const i = getIndexOfColumnInColumnList(position)
		return columnList[i].name
	}
}
