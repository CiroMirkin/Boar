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
