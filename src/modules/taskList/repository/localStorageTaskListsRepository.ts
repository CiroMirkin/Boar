import { emptyTaskBoard, TaskBoard } from '../../TaskBoard/model/taskBoard'
import { isThisArrayOfTypeTaskListInEachColumn } from '../models/taskList'
import { TaskList } from '../../TaskBoard/model/TaskList'
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

			// Detecta y migra el formato legacy (array de TaskList) al nuevo formato TaskBoard
			if (isThisArrayOfTypeTaskListInEachColumn(parsed)) {
				const storedColumns = localStorage.getItem('columnList')
				const defaultColumns = JSON.parse(
					'[{"id":"c1","name":"default_columns.c1","position":"1"},{"id":"c2","name":"default_columns.c2","position":"2"},{"id":"c3","name":"default_columns.c3","position":"3"}]'
				)
				const localColumns = storedColumns ? JSON.parse(storedColumns) : defaultColumns
				const taskBoard = parsed.map((taskList: TaskList, i: number) => ({
					id: localColumns[i].id,
					tasks: taskList,
					status: localColumns[i].name,
				}))

				await this.save(taskBoard)
				return taskBoard
			}

			return parsed
		}

		await this.save(emptyTaskBoard)
		return emptyTaskBoard
	}
}
