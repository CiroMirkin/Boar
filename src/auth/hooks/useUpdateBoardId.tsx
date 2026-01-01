import { useLocation, useParams } from 'react-router'
import { useEffect } from 'react'
import { useBoardId } from '@/auth/state/store'

export const useUpdateBoardId = () => {
	const locator = useLocation()
	const params = useParams()
	const updateBoardId = useBoardId((state) => state.updateBoardId)
	useEffect(() => {
		updateBoardId()
	}, [locator, params, updateBoardId])
}
