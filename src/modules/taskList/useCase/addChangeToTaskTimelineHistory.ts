import BusinessError from '@/commond/errors/businessError'
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

	const actualTaskTimelineHistory = task.timelineHistory || defaultTaskTimelineHistory

	const lastChange = actualTaskTimelineHistory[actualTaskTimelineHistory.length - 1]
	const lastColumnName = lastChange ? lastChange.columnName : ''
	if (columnName === lastColumnName) {
		return actualTaskTimelineHistory
	}

	const newChange: TaskColumnChange = {
		date: new Date(),
		columnName,
	}

	return [...actualTaskTimelineHistory, newChange]
}
