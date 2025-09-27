import BusinessError from '@/sharedByModules/errors/businessError'
import { Tag } from '../Tags/model/tags'
import { NotesAndComments } from './NotesAndComments'

export interface taskModel {
	id: string
	descriptionText: string
	columnPosition: string
	tags?: Tag[]
	notesAndComments?: NotesAndComments
}

export const emptyTask: taskModel = {
	id: '',
	descriptionText: '',
	columnPosition: '1',
	notesAndComments: '',
}

export const isThisTaskDescriptionValid = (taskDescription: string): boolean =>
	!!taskDescription.trim()

export const getNewTask = ({
	descriptionText,
	columnPosition,
}: {
	descriptionText: string
	columnPosition: string
}): taskModel => {
	if (!isThisTaskDescriptionValid(descriptionText))
		throw new BusinessError('No se puede crear una tarea sin descripción.')
	if (descriptionText.length > 200) throw new BusinessError('El texto es demasiado largo.')
	return {
		id: crypto.randomUUID(),
		descriptionText,
		columnPosition,
	}
}
