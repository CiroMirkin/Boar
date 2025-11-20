import { useEffect, useState } from 'react'
import { useTimeTracking } from './useTimeTracking'
import { useUsageHistoryQuery } from './useUsageHistoryQuery'
import { updateDailyUsageRecord } from './useCase/updateDailyUsageRecord'

export const useSaveTimeTracking = () => {
	const { getTotalTime } = useTimeTracking({ pauseOnTabHidden: false })
	const { updateUsageHistory, usageHistory } = useUsageHistoryQuery()
	const [displayTime, setDisplayTime] = useState(0)

	useEffect(() => {
		const intervalId = setInterval(() => {
			const totalTime = getTotalTime()
			if (totalTime !== displayTime) {
				const newUsageHistory = updateDailyUsageRecord({
					duration: totalTime,
					usageHistory,
				})
				updateUsageHistory(newUsageHistory)
				setDisplayTime(totalTime)
			}
		}, 60500)

		return () => clearInterval(intervalId)
	}, [getTotalTime, displayTime])
}
