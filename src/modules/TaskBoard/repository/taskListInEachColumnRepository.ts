import { TaskBoard } from '../../TaskBoard/model/taskBoard'

export interface TaskListInEachColumnRepository {
	save(taskListInEachColumn: TaskBoard): void
	getAll(): Promise<TaskBoard>
}
