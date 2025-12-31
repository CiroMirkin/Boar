import { TaskBoard } from '@/modules/TaskBoard/model/taskBoard'

export interface TaskListInEachColumnRepository {
	save(taskListInEachColumn: TaskBoard, boardId: string): Promise<void>
	getAll(boardId: string): Promise<TaskBoard>
}
