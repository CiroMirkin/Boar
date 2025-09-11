import { setBoar } from '@/modules/board/state/boardReducer'
import LocalStorageBoardRepository from '@/modules/board/state/localstorageBoard'
import { setColumnList } from '@/modules/columnList/state/columnListReducer'
import LocalStorageColumnListRepository from '@/modules/columnList/state/localStorageColumnList'
import { setArchive } from '@/modules/taskList/ArchivedTasks/state/archiveReducer'
import LocalStorageArchiveRepository from '@/modules/taskList/ArchivedTasks/state/localStorageArchive'
import LocalStorageTaskListInEachColumnRepository from '@/modules/taskList/state/localStorageTaskLists'
import { setTaskListInEachColumn } from '@/modules/taskList/state/taskListInEachColumnReducer'

import { syncBoard } from './useSyncBoard'
import { useSession } from '@/SessionProvider'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export const useSyncUserBoard = () => {
	const dispatch = useDispatch()
	const { session } = useSession()

	useEffect(() => {
		const initialStorage = async () => {
			if (session) {
				await syncBoard(dispatch, session)
			} else {
				const columnList = new LocalStorageColumnListRepository()
				dispatch(setColumnList(columnList.getAll()))

				const eachTaskList = new LocalStorageTaskListInEachColumnRepository()
				dispatch(setTaskListInEachColumn(eachTaskList.getAll()))

				const board = new LocalStorageBoardRepository()
				dispatch(setBoar(board.getAll().name))

				const archive = new LocalStorageArchiveRepository()
				dispatch(setArchive(archive.getAll()))
			}
		}
		initialStorage()
	}, [session, dispatch])
}
