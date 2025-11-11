import { UsageHistory, UsageDuration } from '../model/usageHistory'
import { isTheSameDay } from '../utils/isTheSameDay'
import { sumUsageDurations } from '../utils/sumUsageDurations'

interface Params {
	time: UsageDuration
	usageHistory: UsageHistory
}

export function updateDailyUsageRecord({ time, usageHistory }: Params): UsageHistory {
	const today = Date.now()
	if (usageHistory.length >= 1) {
		const lastDayTracking = usageHistory[usageHistory.length - 1]
		if (isTheSameDay(lastDayTracking.date, today)) {
			lastDayTracking.time = sumUsageDurations(lastDayTracking.time, time)
			usageHistory[usageHistory.length - 1] = lastDayTracking
			return [...usageHistory]
		}
	}

	usageHistory.push({
		date: today,
		time,
	})

	return [...usageHistory]
}
