import { setUpUserBoard } from '../utils/setUpUserBoard'
import { useSession } from './useSession'
import { useEffect } from 'react'

export const useSyncUserBoard = () => {
	const { session } = useSession()
	useEffect(() => {
		const initialStorage = async () => {
			if (session) {
				await setUpUserBoard({ session })
				sessionStorage.setItem('isInitialLoad', 'false')
			}
		}
		initialStorage()
	}, [session])
}
