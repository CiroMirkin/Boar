import { Tag } from './tags'

/**
 * Obtiene la prioridad mas alta (numero menor) de un array de etiquetas
 * @returns La prioridad mas alta encontrada o null si no hay prioridades
 */
export function getHighestPriority(tags?: Tag[]): number | null {
	if (!tags || tags.length === 0) {
		return null
	}

	const priorities = tags
		.map((tag) => tag.priority)
		.filter((priority): priority is number => priority !== undefined)

	if (priorities.length === 0) {
		return null
	}

	return Math.min(...priorities) // El número menor es la prioridad más alta
}
