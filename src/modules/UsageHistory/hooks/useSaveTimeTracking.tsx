import { useEffect, useRef } from 'react'
import { useTimeTracking } from './useTimeTracking'
import { useUsageHistoryQuery } from './useUsageHistoryQuery'
import { updateDailyUsageRecord } from '../useCase/updateDailyUsageRecord'
import { getActualBoardId } from '@/auth/utils/getActualBoardId'
import { useSession } from '@/auth/hooks/useSession'

export const useSaveTimeTracking = () => {
	const { getTotalTime, resetTimeTracking } = useTimeTracking({ pauseOnTabHidden: false })
	const { updateUsageHistory, usageHistory, isSaving } = useUsageHistoryQuery()
	const lastSavedTimeRef = useRef(0)
	const boardId = getActualBoardId()
	const boardIdRef = useRef(boardId)

	useEffect(() => {
		const outsideBoard = !boardId
		if (outsideBoard) return

		const intervalId = setInterval(() => {
			try {
				if (isSaving) {
					return
				}

				const totalTime = getTotalTime()
				if (totalTime !== lastSavedTimeRef.current) {
					const newUsageHistory = updateDailyUsageRecord({
						duration: totalTime,
						usageHistory,
					})
					updateUsageHistory(newUsageHistory)
					lastSavedTimeRef.current = totalTime
				}
			} catch (e) {
				console.error()
			}
		}, 60500)

		return () => clearInterval(intervalId)
	}, [getTotalTime, updateUsageHistory, usageHistory, isSaving, boardId])

	const { session } = useSession()
	const sessionRef = useRef(Boolean(session))
	useEffect(() => {
		if (Boolean(session) !== sessionRef.current || boardId !== boardIdRef.current) {
			sessionRef.current = Boolean(session)
			boardIdRef.current = boardId
			resetTimeTracking()
		}
	}, [session, resetTimeTracking, boardId])
}
