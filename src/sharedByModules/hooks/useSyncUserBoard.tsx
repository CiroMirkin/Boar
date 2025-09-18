import { setIsLoading, setBoar } from '@/modules/board/state/boardReducer'
import LocalStorageBoardRepository from '@/modules/board/state/localstorageBoard'
import { setColumnList } from '@/modules/columnList/state/columnListReducer'
import LocalStorageColumnListRepository from '@/modules/columnList/state/localStorageColumnList'
import { useNote } from '@/modules/notes/NoteProvider'
import LocalStorageNotesRepository from '@/modules/notes/repository/LocalStorageNotesRepository'
import { setArchive } from '@/modules/taskList/ArchivedTasks/state/archiveReducer'
import LocalStorageArchiveRepository from '@/modules/taskList/ArchivedTasks/state/localStorageArchive'
import LocalStorageTaskListInEachColumnRepository from '@/modules/taskList/state/localStorageTaskLists'
import { setTaskListInEachColumn } from '@/modules/taskList/state/taskListInEachColumnReducer'

import { syncBoard } from './useSyncBoard'
import { useSession } from '@/SessionProvider'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import LocalStorageReminderRepository from '@/modules/taskList/Reminder/state/LocalStorageReminder'
import { setReminder } from '@/modules/taskList/Reminder/state/reminderReducer'

export const useSyncUserBoard = () => {
	const dispatch = useDispatch()
	const { session } = useSession()
	const { setNote } = useNote()

	useEffect(() => {
		const initialStorage = async () => {
			if (session) {
				const isInitialLoad = sessionStorage.getItem('isInitialLoad')
				if (isInitialLoad === null) {
					dispatch(setIsLoading(true))
					sessionStorage.setItem('isInitialLoad', 'false')
				}
				await syncBoard({ dispatch, session, setNote })
				dispatch(setIsLoading(false))
			} else {
				const columnList = new LocalStorageColumnListRepository()
				dispatch(setColumnList(columnList.getAll()))

				const eachTaskList = new LocalStorageTaskListInEachColumnRepository()
				dispatch(setTaskListInEachColumn(eachTaskList.getAll()))

				const board = new LocalStorageBoardRepository()
				dispatch(setBoar(board.getAll().name))

				const archive = new LocalStorageArchiveRepository()
				dispatch(setArchive(archive.getAll()))

				const notes = new LocalStorageNotesRepository()
				setNote(notes.getAll())

				const reminder = new LocalStorageReminderRepository()
				dispatch(setReminder(reminder.getAll()))

				dispatch(setIsLoading(false))
			}
		}
		initialStorage()
	}, [session, dispatch, setNote])
}
