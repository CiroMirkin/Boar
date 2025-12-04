import BusinessError from '@/commond/errors/businessError'
import { TaskList } from './taskList'

export type TaskColumn = {
	tasks: TaskList
	status: string
	id: string
}

export const getNewTaskColumn = (status: string): TaskColumn | null => {
	if (!isThisColumnNameValid(status)) {
		throw new BusinessError('Error el intentar crear una nueva columna.')
	}

	return {
		id: crypto.randomUUID(),
		status,
		tasks: [],
	}
}

export const isThisColumnNameWithinTheLimitOfLetters = (name: string): boolean => name.length < 30

export const isThisColumnNameValid = (name: string): true | BusinessError => {
	if (!name.trim()) throw new BusinessError('No se pueden crear columnas sin nombre.')
	if (!isThisColumnNameWithinTheLimitOfLetters(name))
		throw new BusinessError('El nombre es demasiado largo.')
	return true
}
