import { emptyTaskBoard, TaskBoard } from '@/features/tasks/model/taskBoard'
import { TaskListInEachColumnRepository } from './taskListInEachColumnRepository'

export default class LocalStorageTaskListInEachColumnRepository
	implements TaskListInEachColumnRepository
{
	key
	constructor() {
		this.key = 'taskListInEachColumn'
	}
	async save(taskBoard: TaskBoard): Promise<void> {
		localStorage.setItem(this.key, JSON.stringify(taskBoard))
	}
	async getAll(): Promise<TaskBoard> {
		const stored = localStorage.getItem(this.key)
		if (stored) {
			const parsed = JSON.parse(stored)
			return parsed
		}

		await this.save(emptyTaskBoard)
		return emptyTaskBoard
	}
}
