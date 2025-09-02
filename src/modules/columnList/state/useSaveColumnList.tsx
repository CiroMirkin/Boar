import { useSession } from '@/SessionProvider'
import { ColumnList, defaultColumnList } from '../models/columnList'
import LocalStorageColumnListRepository from './localStorageColumnList'
import { sendForSaveColumnList } from './sendForSaveColumnList'
import { useEffect } from 'react'

interface useSaveColumnListParams {
	columnList: ColumnList
}

export const useSaveColumnList = ({ columnList }: useSaveColumnListParams) => {
	const { session } = useSession()
	useEffect(() => {
		const localStorage = new LocalStorageColumnListRepository()
		const localColumnList = localStorage.getAll()
		
		if (JSON.stringify(columnList) !== JSON.stringify(defaultColumnList)) {
			const isNotTheLocalColumnList =
			JSON.stringify(columnList) !== JSON.stringify(localColumnList)
			if (!!session && isNotTheLocalColumnList) {
				sendForSaveColumnList(columnList)
			} else {
				localStorage.save(columnList)
			}
		}
	}, [columnList, session])
}
