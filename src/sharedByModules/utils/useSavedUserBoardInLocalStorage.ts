import { setBoar } from '@/modules/board/state/boardReducer'
import LocalStorageBoardRepository from '@/modules/board/state/localstorageBoard'
import { setColumnList } from '@/modules/columnList/state/columnListReducer'
import LocalStorageColumnListRepository from '@/modules/columnList/state/localStorageColumnList'
import { setArchive } from '@/modules/taskList/ArchivedTasks/state/archiveReducer'
import LocalStorageArchiveRepository from '@/modules/taskList/ArchivedTasks/state/localStorageArchive'
import LocalStorageTaskListInEachColumnRepository from '@/modules/taskList/state/localStorageTaskLists'
import { setTaskListInEachColumn } from '@/modules/taskList/state/taskListInEachColumnReducer'
import { SessionType } from '@/SessionProvider'
import { Dispatch } from '@reduxjs/toolkit'
import { useEffect } from 'react'

export const useSavedUserBoardInLocalStorage = (dispatch: Dispatch, session: SessionType) => {
	useEffect(() => {
		if (!session) {
			const columnList = new LocalStorageColumnListRepository()
			dispatch(setColumnList(columnList.getAll()))
			
			const eachTaskList = new LocalStorageTaskListInEachColumnRepository()
			dispatch(setTaskListInEachColumn(eachTaskList.getAll()))
			
			const board = new LocalStorageBoardRepository()
			dispatch(setBoar(board.getAll().name))
			
			const archive = new LocalStorageArchiveRepository()
			dispatch(setArchive(archive.getAll()))
		}
	}, [session, dispatch])
}
