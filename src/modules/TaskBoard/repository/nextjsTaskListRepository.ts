import { emptyTaskBoard, TaskBoard } from '@/modules/TaskBoard/model/taskBoard'
import { TaskListInEachColumnRepository } from './taskListInEachColumnRepository'
import { getTaskBoard, saveTaskBoard } from '@/actions/tasks'

export default class NextjsTaskListInEachColumnRepository
	implements TaskListInEachColumnRepository
{
	async getAll(boardId: string): Promise<TaskBoard> {
		const board = await getTaskBoard({ boardId })
		return board ?? emptyTaskBoard
	}

	async save(taskListInEachColumn: TaskBoard, boardId: string): Promise<void> {
		await saveTaskBoard({ boardId, taskBoard: taskListInEachColumn })
	}
}
