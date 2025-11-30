import { useColumnList } from './useColumnList'

export const useGetColumnNameFromPosition = (): ((columnPosition: string) => string) => {
	const columnList = useColumnList()

	return (position: string) => {
		if (!columnList) return ''
		const i = Number(position) - 1
		return columnList[i].name
	}
}
