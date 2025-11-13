/**
 * Tiempo en milisegundos.
 * @example Para convertir a minutos: Math.round(getTotalTime() / 60000
 */
export type UsageDuration = number

export interface UsageSession {
	startTimestamp: number
	duration: UsageDuration
}

export interface DailyUsage {
	/** Llamada a Date.now() */
	date: number
	periods: UsageSession[]
}

export type UsageHistory = DailyUsage[]
