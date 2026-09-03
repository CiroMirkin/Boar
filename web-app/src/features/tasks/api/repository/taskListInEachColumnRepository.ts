import { TaskBoard } from '@/features/tasks/model/taskBoard'

export interface TaskListInEachColumnRepository {
	save(taskListInEachColumn: TaskBoard, boardId: string): Promise<void>
	getAll(boardId: string): Promise<TaskBoard>
}
