import BusinessError from '@/shared/errors/businessError'
import type { Tag } from '@/features/tags'
import { NotesAndComments } from '@/modules/TaskBoard/components/taskList/models/NotesAndComments'
import { TaskTimelineHistory } from '@/modules/TaskBoard/components/taskList/models/taskTimelineHistory'

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
