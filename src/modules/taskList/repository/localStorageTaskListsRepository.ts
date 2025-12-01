import { emptyTaskBoard, TaskBoard } from '../models/taskBoard'
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
	async getAll() {
		const stored = localStorage.getItem(this.key)
		if (stored) {
			return JSON.parse(stored)
		}
		await this.save(emptyTaskBoard)
		return emptyTaskBoard
	}
}
