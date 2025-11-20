import { useUsageHistoryQuery } from '../useUsageHistoryQuery'
import { parseDuration } from '../utils/parseDuration'

/** @description Formato -> 00:00:00 */
export const useDurationOfTheLastPeriod = (): string => {
	const { usageHistory } = useUsageHistoryQuery()

	if (usageHistory.length >= 1) {
		const lastUsageRecord = usageHistory[usageHistory.length - 1]
		const lastUsagePeriod = lastUsageRecord.periods[lastUsageRecord.periods.length - 1]
		return parseDuration(lastUsagePeriod.duration)
	}

	return '00:00:00'
}
