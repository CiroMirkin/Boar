import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import { Column } from '../models/column'
import { isDefaultColumnList } from '../models/columnList'
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'

export const useColumnList = (): Column[] => {
	const { t } = useTranslation()
	const columnList = useSelector((state: RootState) => state.columnList.list)

	return useMemo(() => {
		if (!isDefaultColumnList(columnList)) {
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
	}, [columnList, t])
}
