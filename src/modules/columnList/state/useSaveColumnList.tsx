import { SessionType } from '@/SessionProvider'
import { ColumnList, defaultColumnList } from '../models/columnList'
import LocalStorageColumnListRepository from './localStorageColumnList'
import { sendForSaveColumnList } from './sendForSaveColumnList'

interface useSaveColumnListParams {
	columnList: ColumnList
	session: SessionType
}

export const useSaveColumnList = ({ columnList, session }: useSaveColumnListParams) => {
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
}
