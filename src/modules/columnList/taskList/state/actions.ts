import { taskModel } from '../models/task'
import { TaskList } from '../models/taskList'

export interface taskUseCaseParams {
	taskListInEachColumn: TaskList[]
	task: taskModel
}
