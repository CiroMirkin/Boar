import { setArchive } from '@/modules/taskList/ArchivedTasks/state/archiveReducer'
import LocalStorageArchiveRepository from '@/modules/taskList/ArchivedTasks/repository/localStorageArchive'

import { setUpUserBoard } from '../utils/setUpUserBoard'
import { useSession } from './useSession'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export const useSyncUserBoard = () => {
	const dispatch = useDispatch()
	const { session } = useSession()

	useEffect(() => {
		const initialStorage = async () => {
			if (session) {
				await setUpUserBoard({ dispatch, session })
				sessionStorage.setItem('isInitialLoad', 'false')
			} else {
				const archive = new LocalStorageArchiveRepository()
				dispatch(setArchive(archive.getAll()))
			}
		}
		initialStorage()
	}, [session, dispatch])
}
