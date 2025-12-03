import { UsageDuration } from '../model/usageHistory'

export const sumUsageDurations = (time1: UsageDuration, time2: UsageDuration): UsageDuration => {
	return (time1 || 0) + (time2 || 0)
}
