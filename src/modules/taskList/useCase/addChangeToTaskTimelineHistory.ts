import BusinessError from '@/sharedByModules/errors/businessError'
import { taskModel } from '../models/task'
import {
	TaskTimelineHistory,
	TaskColumnChange,
	defaultTaskTimelineHistory,
} from '../models/taskTimelineHistory'

export const addChangeToTaskTimelineHistory = ({
	task,
	columnName,
}: {
	task: taskModel
	columnName: string
}): TaskTimelineHistory => {
	if (columnName === undefined || columnName === null) {
		const message = `columnName es requerido, no puede ser ${columnName}`
		throw new BusinessError(message)
	}
	if (columnName.trim() === '') {
		throw new BusinessError('columnName no puede estar vacio')
	}

	const newChange: TaskColumnChange = {
		date: new Date(),
		columnName,
	}

	const actualTaskTimelineHistory = task.timelineHistory || defaultTaskTimelineHistory

	return [...actualTaskTimelineHistory, newChange]
}
