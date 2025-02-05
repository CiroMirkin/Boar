import { boardModel } from '../board/models/board'
import { Column } from '@/board/columnList/models/column' 
import { taskModel } from '../board/taskList/models/task'
import { TaskList } from '@/board/taskList/models/taskList'

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
