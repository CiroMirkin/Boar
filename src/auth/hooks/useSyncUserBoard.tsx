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
			}
		}
		initialStorage()
	}, [session, dispatch])
}
