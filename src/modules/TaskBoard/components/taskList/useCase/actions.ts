import { taskModel } from '@/modules/TaskBoard/model/task'
import { TaskList } from '@/modules/TaskBoard/model/TaskList'

export interface taskUseCaseParams {
	taskListInEachColumn: TaskList[]
	task: taskModel
}
