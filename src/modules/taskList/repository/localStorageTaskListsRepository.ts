import { TaskListInEachColumn, emptyTaskListInEachColumn } from '@/modules/taskList/models/taskList'
import { TaskListInEachColumnRepository } from './taskListInEachColumnRepository'

export default class LocalStorageTaskListInEachColumnRepository
	implements TaskListInEachColumnRepository
{
	key
	constructor() {
		this.key = 'taskListInEachColumn'
	}
	async save(taskListInEachColumn: TaskListInEachColumn): Promise<void> {
		localStorage.setItem(this.key, JSON.stringify(taskListInEachColumn))
	}
	async getAll() {
		const stored = localStorage.getItem(this.key)
		if (stored) {
			return JSON.parse(stored)
		}
		await this.save(emptyTaskListInEachColumn)
		return emptyTaskListInEachColumn
	}
}
