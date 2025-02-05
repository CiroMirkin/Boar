import { defaultColumnList } from '@/models/columnList'
import { ColumnList as columnListModel } from '@/models/columnList'
import React from 'react'
import { ReactNode } from 'react'
import { useColumnList } from '@/hooks/useColumnList'

export const ColumnListContext = React.createContext(defaultColumnList as columnListModel)

export function ColumnListProvider({ children }: { children: ReactNode }) {
	const columnList = useColumnList()

	return <ColumnListContext.Provider value={columnList}>{children}</ColumnListContext.Provider>
}
