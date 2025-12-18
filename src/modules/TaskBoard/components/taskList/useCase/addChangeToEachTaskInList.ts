import BusinessError from '@/common/errors/businessError'
import { TaskListInEachColumn } from '../models/taskListInEachColumn'
import { addChangeToTaskTimelineHistory } from './addChangeToTaskTimelineHistory'

interface addChangeToEachTaskInListParams {
	listOfTasksInColumns: TaskListInEachColumn
	taskListIndex: number
	columnName: string
}
export const addChangeToEachTaskInList = ({
	listOfTasksInColumns,
	taskListIndex,
	columnName,
}: addChangeToEachTaskInListParams) => {
	if (columnName === undefined || columnName === null) {
		const message = `columnName es requerido, no puede ser ${columnName}`
		throw new BusinessError(message)
	}
	if (columnName.trim() === '') throw new BusinessError('columnName no puede estar vacio')
	if (taskListIndex < 0) return listOfTasksInColumns

	const updatedList = listOfTasksInColumns.map((taskList, index) => {
		if (index === taskListIndex) {
			const updatedTaskList = taskList.map((task) => {
				const timelineHistory = addChangeToTaskTimelineHistory({
					task,
					columnName,
				})
				return {
					...task,
					timelineHistory,
				}
			})

			return updatedTaskList
		}

		return taskList
	})

	return updatedList
}
