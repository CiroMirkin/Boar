import { defaultColumnList } from '@/board/columnList/models/columnList'
import { ColumnList as columnListModel } from '@/board/columnList/models/columnList'
import React from 'react'
import { ReactNode } from 'react'
import { useColumnList } from '@/board/columnList/hooks/useColumnList'

export const ColumnListContext = React.createContext(defaultColumnList as columnListModel)

export function ColumnListProvider({ children }: { children: ReactNode }) {
	const columnList = useColumnList()

	return <ColumnListContext.Provider value={columnList}>{children}</ColumnListContext.Provider>
}
