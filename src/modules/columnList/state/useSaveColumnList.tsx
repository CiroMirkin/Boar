import { useSession } from '@/SessionProvider'
import { ColumnList, defaultColumnList } from '../models/columnList'
import LocalStorageColumnListRepository from './localStorageColumnList'
import { sendForSaveColumnList } from './sendForSaveColumnList'
import { useEffect, useRef } from 'react'

interface useSaveColumnListParams {
	columnList: ColumnList
}

export const useSaveColumnList = ({ columnList }: useSaveColumnListParams) => {
	const { session } = useSession()
	const columnListRef = useRef(columnList)
	useEffect(() => {
		const localStorage = new LocalStorageColumnListRepository()
		const localColumnList = localStorage.getAll()

		const isNotColumnListByDefault =
			JSON.stringify(columnList) !== JSON.stringify(defaultColumnList)
		const beforeWasNotColumnListByDefault =
			JSON.stringify(columnListRef.current) !== JSON.stringify(defaultColumnList)

		if (isNotColumnListByDefault || beforeWasNotColumnListByDefault) {
			const isNotTheLocalColumnList =
				JSON.stringify(columnList) !== JSON.stringify(localColumnList)
			columnListRef.current = columnList
			if (session && isNotTheLocalColumnList) {
				sendForSaveColumnList(columnList)
			} else {
				localStorage.save(columnList)
			}
		}
	}, [columnList, session])
}
