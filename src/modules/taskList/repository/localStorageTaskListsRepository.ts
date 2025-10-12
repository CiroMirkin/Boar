import { TaskListInEachColumn, emptyTaskListInEachColumn } from '@/modules/taskList/models/taskList'
import { TaskListInEachColumnRepository } from './taskListInEachColumnRepository'

export default class LocalStorageTaskListInEachColumnRepository
	implements TaskListInEachColumnRepository
{
	key
	constructor() {
		this.key = 'taskListInEachColumn'
	}
	save(taskListInEachColumn: TaskListInEachColumn): void {
		localStorage.setItem(this.key, JSON.stringify(taskListInEachColumn))
	}
	getAll() {
		const stored = localStorage.getItem(this.key)
		if (stored) {
			return JSON.parse(stored)
		}
		this.save(emptyTaskListInEachColumn)
		return emptyTaskListInEachColumn
	}
}
