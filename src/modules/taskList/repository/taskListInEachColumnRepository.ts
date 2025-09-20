import { TaskListInEachColumn } from "../models/taskList"

export interface TaskListInEachColumnRepository {
	save(taskListInEachColumn: TaskListInEachColumn): void
	getAll(): TaskListInEachColumn
}
