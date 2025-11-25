import { useEffect, useRef } from 'react'
import { useTimeTracking } from './useTimeTracking'
import { useUsageHistoryQuery } from './useUsageHistoryQuery'
import { updateDailyUsageRecord } from './useCase/updateDailyUsageRecord'

export const useSaveTimeTracking = () => {
	const { getTotalTime } = useTimeTracking({ pauseOnTabHidden: false })
	const { updateUsageHistory, usageHistory, isSaving } = useUsageHistoryQuery()
	const lastSavedTimeRef = useRef(0)

	useEffect(() => {
		const intervalId = setInterval(() => {
			if (isSaving) {
				return
			}

			const totalTime = getTotalTime()
			if (totalTime !== lastSavedTimeRef.current) {
				console.log('Current usage history:', usageHistory)

				const newUsageHistory = updateDailyUsageRecord({
					duration: totalTime,
					usageHistory,
				})
				updateUsageHistory(newUsageHistory)
				lastSavedTimeRef.current = totalTime
			}
		}, 60500)

		return () => clearInterval(intervalId)
	}, [getTotalTime, updateUsageHistory, usageHistory, isSaving])
}
