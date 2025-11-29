import { TaskBoard } from '../models/taskBoard'

export interface TaskListInEachColumnRepository {
	save(taskListInEachColumn: TaskBoard): void
	getAll(): Promise<TaskBoard>
}
