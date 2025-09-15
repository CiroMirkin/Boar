import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import { Column } from '../models/column'
import { defaultColumnList } from '../models/columnList'
import { useTranslation } from 'react-i18next'

export const useColumnList = (): Column[] => {
	const { t } = useTranslation()
	const columnList = useSelector((state: RootState) => state.columnList.list)

	const isTheColumnListByDefault = columnList.every(
		(id, index) => id === defaultColumnList[index]
	)

	if (!isTheColumnListByDefault) {
		return columnList
	}

	const translateColumnName = columnList.map((column) => {
		const key = `default_columns.${column.id}`
		const translatedName = t(key)

		return {
			...column,
			name: translatedName,
		}
	})

	return translateColumnName
}
