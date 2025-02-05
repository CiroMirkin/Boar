import { boardModel } from '../components/board/models/board'
import { Column } from '../archive/models/column'
import { taskModel } from '../components/board/taskList/models/task'
import { TaskList } from '@/pages/board/taskList/models/taskList'

export interface boardUseCaseParams {
	board: boardModel
}
export interface taskUseCaseParams {
	taskListInEachColumn: TaskList[]
	task: taskModel
}
export interface changeNameParams extends boardUseCaseParams {
	newName: string
}
export interface columnUseCaseParams {
	columnList: Column[]
	column: Column
}
