import { emptyTaskBoard, TaskBoard } from '@/features/tasks/model/taskBoard'
import { TaskListInEachColumnRepository } from './taskListInEachColumnRepository'

export default class NextjsTaskListInEachColumnRepository
	implements TaskListInEachColumnRepository
{
	async getAll(boardId: string): Promise<TaskBoard> {
		const { getTaskBoard } = await import('../actions/getTaskBoard')
		const board = await getTaskBoard({ boardId })
		return board ?? emptyTaskBoard
	}

	async save(taskListInEachColumn: TaskBoard, boardId: string): Promise<void> {
		const { saveTaskBoard } = await import('../actions/saveTaskBoard')
		await saveTaskBoard({ boardId, taskBoard: taskListInEachColumn })
	}
}
