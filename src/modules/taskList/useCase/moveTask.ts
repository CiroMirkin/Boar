import { taskUseCaseParams } from './actions'
import { TaskList, isThisTaskListWithinTheLimit } from '@/modules/taskList/models/taskList'

export type moveToType = 'next-column' | 'prev-column'

interface moveTaskParams extends taskUseCaseParams {
	to: moveToType
}

export const moveThisTask = ({ task, to, taskListInEachColumn }: moveTaskParams): TaskList[] => {
	const currentColumnIndex = findTaskColumnIndex(taskListInEachColumn, task.id)

	const targetColumnIndex = to === 'next-column' ? currentColumnIndex + 1 : currentColumnIndex - 1
	if (!isValidColumnIndex(targetColumnIndex, taskListInEachColumn.length)) {
		return taskListInEachColumn
	}

	const taskIndexInCurrentColumn = findTaskIndex(
		taskListInEachColumn[currentColumnIndex],
		task.id
	)
	if (currentColumnIndex === -1) {
		return taskListInEachColumn
	}

	const newTaskListInEachColumn = structuredClone(taskListInEachColumn)
	removeTaskFromColumn(newTaskListInEachColumn[currentColumnIndex], taskIndexInCurrentColumn)
	const movedTask = { ...task }
	newTaskListInEachColumn[targetColumnIndex].push(movedTask)

	const targetColumnIsWithinLimit = isThisTaskListWithinTheLimit({
		taskList: newTaskListInEachColumn[targetColumnIndex],
	})
	return targetColumnIsWithinLimit ? newTaskListInEachColumn : targetColumnIsWithinLimit
}

export const findTaskColumnIndex = (taskListInEachColumn: TaskList[], taskId: string): number => {
	return taskListInEachColumn.findIndex((taskList) => taskList.some((task) => task.id === taskId))
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
