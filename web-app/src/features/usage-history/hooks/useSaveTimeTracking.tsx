import { useEffect, useRef } from 'react'
import { useTimeTracking } from './useTimeTracking'
import { useUsageHistoryQuery } from './useUsageHistoryQuery'
import { updateDailyUsageRecord } from '../useCase/updateDailyUsageRecord'
import { useSession, useBoardId } from '@/features/auth'

export const useSaveTimeTracking = () => {
	const { getTotalTime, resetTimeTracking } = useTimeTracking({ pauseOnTabHidden: false })
	const { updateUsageHistory, usageHistory, isSaving } = useUsageHistoryQuery()
	const lastSavedTimeRef = useRef(0)
	const boardId = useBoardId((state) => state.board_id)
	const boardIdRef = useRef(boardId)
	const isSavingRef = useRef(isSaving)

	useEffect(() => {
		isSavingRef.current = isSaving
	}, [isSaving])

	useEffect(() => {
		const outsideBoard = !boardId
		if (outsideBoard) return

		const intervalId = setInterval(() => {
			try {
				if (isSavingRef.current) {
					return
				}

				const totalTime = getTotalTime()
				const incrementalDuration = totalTime - lastSavedTimeRef.current
				if (incrementalDuration > 0) {
					const newUsageHistory = updateDailyUsageRecord({
						duration: incrementalDuration,
						usageHistory,
					})
					updateUsageHistory(newUsageHistory)
					lastSavedTimeRef.current = totalTime
				}
			} catch (e) {
				console.error('Error saving time tracking:', e)
			}
		}, 60500)

		return () => clearInterval(intervalId)
	}, [getTotalTime, updateUsageHistory, usageHistory, boardId])

	const { session } = useSession()
	const sessionRef = useRef(Boolean(session))

	useEffect(() => {
		const sessionChanged = Boolean(session) !== sessionRef.current
		const boardChanged = boardIdRef.current !== boardId
		if (sessionChanged || boardChanged) {
			sessionRef.current = Boolean(session)
			boardIdRef.current = boardId
			lastSavedTimeRef.current = 0
			resetTimeTracking()
		}
	}, [session, boardId, resetTimeTracking])
}
