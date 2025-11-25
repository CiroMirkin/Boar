import { useUsageHistoryQuery } from '../useUsageHistoryQuery'
import { isTheSameDay } from '../utils/isTheSameDay'
import { parseDuration } from '../utils/parseDuration'

/**
 * @description Formato HH:MM:SS
 * - Si el ultimo periodo no es de hoy devulve un string con formato vacio (00:00:00)
 * @default 00:00:00
 * */
export const useDurationOfTheLastPeriod = (): string => {
	const { usageHistory } = useUsageHistoryQuery()

	if (usageHistory.length >= 1) {
		const lastUsageRecord = usageHistory[usageHistory.length - 1]
		const lastUsagePeriod = lastUsageRecord.periods[lastUsageRecord.periods.length - 1]
		if (isTheSameDay(lastUsagePeriod.startTimestamp, Date.now())) {
			return parseDuration(lastUsagePeriod.duration)
		}
	}

	return '00:00:00'
}
