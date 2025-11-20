import { DailyUsage } from './usageHistory'

/** Se especifica en milisegundos */
const TIME_LIMIT: number = 1500000 // 25 minutos

/**
 * @description Primero se calcula el tiempo final del último período (startTimestamp + duration)
 * y luego se calcula cuanto tiempo ha pasado desde ese momento final hasta ahora
 * @returns true si ha pasado mas del limite de tiempo (1 hora)
 */
export function needsNewUsageSession(lastDayTracking: DailyUsage): boolean {
	if (!lastDayTracking || lastDayTracking.periods.length === 0) {
		return true
	}

	const lastPeriod = lastDayTracking.periods[lastDayTracking.periods.length - 1]
	const lastUpdateEndTime = lastPeriod.startTimestamp + lastPeriod.duration
	const currentTime = Date.now()
	const timeSinceLastUpdate = currentTime - lastUpdateEndTime

	return timeSinceLastUpdate > TIME_LIMIT
}
