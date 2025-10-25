import { getIndexOfColumnInColumnList } from '../../columnList/models/column'
import { taskUseCaseParams } from './actions'
import { getNewTask, taskModel } from '@/modules/taskList/models/task'
import { TaskList, isThisTaskListWithinTheLimit } from '@/modules/taskList/models/taskList'

export type moveToType = 'next-column' | 'prev-column'

interface moveTaskParams extends taskUseCaseParams {
	to: moveToType
}

export const moveThisTask = ({ task, to, taskListInEachColumn }: moveTaskParams): TaskList[] => {
	const currentColumnIndex = getIndexOfColumnInColumnList(task.columnPosition)
	const targetColumnIndex = to === 'next-column' ? currentColumnIndex + 1 : currentColumnIndex - 1
	if (!isValidColumnIndex(targetColumnIndex, taskListInEachColumn.length)) {
		return taskListInEachColumn
	}

	const taskIndexInCurrentColumn = findTaskIndex(
		taskListInEachColumn[currentColumnIndex],
		task.id
	)
	if (taskIndexInCurrentColumn === -1) {
		return taskListInEachColumn
	}

	const newTaskListInEachColumn = structuredClone(taskListInEachColumn)
	removeTaskFromColumn(newTaskListInEachColumn[currentColumnIndex], taskIndexInCurrentColumn)
	const movedTask = createTaskForNewColumn(task, targetColumnIndex)
	newTaskListInEachColumn[targetColumnIndex].push(movedTask)

	const targetColumnIsWithinLimit = isThisTaskListWithinTheLimit({
		taskList: newTaskListInEachColumn[targetColumnIndex],
	})
	return targetColumnIsWithinLimit ? newTaskListInEachColumn : targetColumnIsWithinLimit
}

const isValidColumnIndex = (index: number, maxLength: number): boolean => {
	return index >= 0 && index < maxLength
}

const findTaskIndex = (taskList: TaskList, taskId: string): number => {
	return taskList.findIndex((t) => t.id === taskId)
}

const removeTaskFromColumn = (taskList: TaskList, index: number): void => {
	taskList.splice(index, 1)
}

const createTaskForNewColumn = (originalTask: taskModel, columnIndex: number): taskModel => {
	const newTask = getNewTask({
		descriptionText: originalTask.descriptionText,
		columnPosition: `${columnIndex + 1}`,
	})

	return { ...originalTask, ...newTask, id: originalTask.id }
}

export const moveThisTaskToTheNextColumn = ({
	task,
	taskListInEachColumn,
}: taskUseCaseParams): TaskList[] => {
	return moveThisTask({ task, to: 'next-column', taskListInEachColumn })
}

export const moveThisTaskToThePrevColumn = ({
	task,
	taskListInEachColumn,
}: taskUseCaseParams): TaskList[] => {
	return moveThisTask({ task, to: 'prev-column', taskListInEachColumn })
}
