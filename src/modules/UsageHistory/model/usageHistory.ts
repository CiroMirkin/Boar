/**
 * Tiempo en milisegundos.
 * @example Para convertir a minutos: Math.round(getTotalTime() / 60000
 */
export type UsageDuration = number

export interface UsageSession {
	/**
	 * Timestamp de cuando empezó este período de actividad.
	 * Puede haber periodos de inactividad entre el final de un período y el inicio del siguiente.
	 * El tiempo de inactividad NO deberia contabilizarse.
	 */
	startTimestamp: number

	/**
	 * Timestamp de cuando terminó este período de actividad.
	 * Puede ser calculado como startTimestamp + duration para sesiones pasadas.
	 */
	endTimestamp: number

	/**
	 * Duración en milisegundos de este período de ACTIVIDAD.
	 */
	duration: UsageDuration
}

export interface DailyUsage {
	/** Llamada a Date.now() */
	date: number
	periods: UsageSession[]
}

export type UsageHistory = DailyUsage[]

/**
 * Migra datos antiguos del historial de uso que no tienen la propiedad endTimestamp.
 * Para sesiones sin endTimestamp, lo calcula como startTimestamp + duration.
 */
export function migrateUsageHistory(history: UsageHistory): UsageHistory {
	return history.map((day) => ({
		...day,
		periods: day.periods.map((session) => ({
			...session,
			endTimestamp: session.endTimestamp ?? session.startTimestamp + session.duration,
		})),
	}))
}
