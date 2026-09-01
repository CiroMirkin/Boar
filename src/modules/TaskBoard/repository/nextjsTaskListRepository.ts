import { emptyTaskBoard, TaskBoard } from '@/modules/TaskBoard/model/taskBoard'
import { TaskListInEachColumnRepository } from './taskListInEachColumnRepository'

export default class NextjsTaskListInEachColumnRepository
	implements TaskListInEachColumnRepository
{
	async getAll(boardId: string): Promise<TaskBoard> {
		const { getTaskBoard } = await import('@/actions/tasks')
		const board = await getTaskBoard({ boardId })
		return board ?? emptyTaskBoard
	}

	async save(taskListInEachColumn: TaskBoard, boardId: string): Promise<void> {
		const { saveTaskBoard } = await import('@/actions/tasks')
		await saveTaskBoard({ boardId, taskBoard: taskListInEachColumn })
	}
}
