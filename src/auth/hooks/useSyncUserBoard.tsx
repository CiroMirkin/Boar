import { setColumnList } from '@/modules/columnList/state/columnListReducer'
import LocalStorageColumnListRepository from '@/modules/columnList/repository/localStorageColumnList'
import { setArchive } from '@/modules/taskList/ArchivedTasks/state/archiveReducer'
import LocalStorageArchiveRepository from '@/modules/taskList/ArchivedTasks/repository/localStorageArchive'
import LocalStorageTaskListInEachColumnRepository from '@/modules/taskList/repository/localStorageTaskListsRepository'
import { setTaskListInEachColumn } from '@/modules/taskList/state/taskListInEachColumnReducer'

import { setUpUserBoard } from '../utils/setUpUserBoard'
import { useSession } from './useSession'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import LocalStorageReminderRepository from '@/modules/taskList/Reminder/repository/LocalStorageReminder'
import { setReminder } from '@/modules/taskList/Reminder/state/reminderReducer'

export const useSyncUserBoard = () => {
	const dispatch = useDispatch()
	const { session } = useSession()

	useEffect(() => {
		const initialStorage = async () => {
			if (session) {
				await setUpUserBoard({ dispatch, session })
				sessionStorage.setItem('isInitialLoad', 'false')
			} else {
				const columnList = new LocalStorageColumnListRepository()
				dispatch(setColumnList(columnList.getAll()))

				const eachTaskList = new LocalStorageTaskListInEachColumnRepository()
				dispatch(setTaskListInEachColumn(eachTaskList.getAll()))

				// Board and Notes are now handled by React Query, no need to load here

				const archive = new LocalStorageArchiveRepository()
				dispatch(setArchive(archive.getAll()))

				const reminder = new LocalStorageReminderRepository()
				dispatch(setReminder(reminder.getAll()))
			}
		}
		initialStorage()
	}, [session, dispatch])
}
