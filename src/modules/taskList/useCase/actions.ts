import { taskModel } from '../../TaskBoard/model/task'
import { TaskList } from '../../TaskBoard/model/TaskList'

export interface taskUseCaseParams {
	taskListInEachColumn: TaskList[]
	task: taskModel
}
