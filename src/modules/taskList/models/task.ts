import BusinessError from '@/sharedByModules/errors/businessError'
import { Tag } from '../Tags/model/tags'
import { NotesAndComments } from './NotesAndComments'
import { TaskTimelineHistory } from './taskTimelineHistory'

export interface taskModel {
	id: string
	descriptionText: string
	tags?: Tag[]
	notesAndComments?: NotesAndComments
	timelineHistory?: TaskTimelineHistory
}

export const emptyTask: taskModel = {
	id: '',
	descriptionText: '',
	notesAndComments: '',
}

export const isThisTaskDescriptionValid = (taskDescription: string): boolean =>
	!!taskDescription.trim()

export const getNewTask = ({ descriptionText }: { descriptionText: string }): taskModel => {
	if (!isThisTaskDescriptionValid(descriptionText))
		throw new BusinessError('No se puede crear una tarea sin descripción.')
	if (descriptionText.length > 200) throw new BusinessError('El texto es demasiado largo.')
	return {
		id: crypto.randomUUID(),
		descriptionText,
	}
}
