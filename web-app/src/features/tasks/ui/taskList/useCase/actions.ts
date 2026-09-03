import { taskModel } from '@/features/tasks/model/task'
import { TaskList } from '@/features/tasks/model/TaskList'

export interface taskUseCaseParams {
	taskListInEachColumn: TaskList[]
	task: taskModel
}
