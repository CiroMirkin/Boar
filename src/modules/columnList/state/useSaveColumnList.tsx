import { useSession } from '@/SessionProvider'
import { ColumnList, defaultColumnList } from '../models/columnList'
import LocalStorageColumnListRepository from '../repository/localStorageColumnList'
import { useEffect } from 'react'
import SupabaseColumnListRepository from '../repository/supabaseRepository'

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
				const supabaseColumnList = new SupabaseColumnListRepository()
				supabaseColumnList.save(columnList)
			} else {
				localStorage.save(columnList)
			}
		}
	}, [columnList, session])
}
