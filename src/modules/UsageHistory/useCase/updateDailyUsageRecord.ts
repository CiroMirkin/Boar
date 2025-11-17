import { needsNewUsageSession } from '../model/needsNewUsageSession'
import { UsageHistory, UsageDuration } from '../model/usageHistory'
import { isTheSameDay } from '../utils/isTheSameDay'
import { sumUsageDurations } from '../utils/sumUsageDurations'

interface Params {
	duration: UsageDuration
	usageHistory: UsageHistory
}

export function updateDailyUsageRecord({ duration, usageHistory }: Params): UsageHistory {
	const today = Date.now()
	const newPeriod = {
		startTimestamp: Date.now(),
		duration,
	}

	const lastDayTracking = usageHistory[usageHistory.length - 1]
	if (usageHistory.length <= 1 || !isTheSameDay(lastDayTracking.date, today)) {
		usageHistory.push({
			date: today,
			periods: [{ ...newPeriod }],
		})

		return [...usageHistory]
	}

	if (needsNewUsageSession(lastDayTracking)) {
		lastDayTracking.periods.push(newPeriod)
	} else {
		const lastPeriod = lastDayTracking.periods[lastDayTracking.periods.length - 1]
		lastPeriod.duration = sumUsageDurations(lastPeriod.duration, duration)
		lastDayTracking.periods[lastDayTracking.periods.length - 1] = lastPeriod
	}
	usageHistory[usageHistory.length - 1] = lastDayTracking
	return [...usageHistory]
}
