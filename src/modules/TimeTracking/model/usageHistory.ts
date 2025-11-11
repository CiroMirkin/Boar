/**
 * Tiempo en milisegundos.
 * @example Para convertir a minutos: Math.round(getTotalTime() / 60000
 */
export type UsageDuration = number

export interface DailyTracking {
	date: number
	time: UsageDuration
}

export type UsageHistory = DailyTracking[]
