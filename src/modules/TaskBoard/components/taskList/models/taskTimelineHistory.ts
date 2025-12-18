/**
 * Representa el cambio de columna de una tarea, conteniendo información sobre dicho cambio.
 */
export interface TaskColumnChange {
	date: Date
	columnName: string
}

export type TaskTimelineHistory = TaskColumnChange[]
export const defaultTaskTimelineHistory = []
