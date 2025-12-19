import { getHighestPriority } from '../components/Tags/model/getHighestPriority'
import { taskModel } from '@/modules/TaskBoard/model/task'

/**
 * Ordena un array de tareas según la prioridad de sus etiquetas
 * Prioridad 1 es la mayor (se muestra primero)
 * Las tareas sin etiquetas o sin prioridad van al final
 */
export function sortTasksByPriority(tasks: taskModel[]): taskModel[] {
	return tasks.sort((a, b) => {
		const priorityA = getHighestPriority(a.tags)
		const priorityB = getHighestPriority(b.tags)

		// Si ambas tienen prioridad, ordenar por prioridad (1 es mayor que 2, 3, etc.)
		if (priorityA !== null && priorityB !== null) {
			return priorityA - priorityB
		}

		// Si solo A tiene prioridad, A va primero
		if (priorityA !== null && priorityB === null) {
			return -1
		}

		// Si solo B tiene prioridad, B va primero
		if (priorityA === null && priorityB !== null) {
			return 1
		}

		// Si ninguna tiene prioridad, mantener orden original
		return 0
	})
}
