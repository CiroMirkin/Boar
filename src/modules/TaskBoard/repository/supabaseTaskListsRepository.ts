import { emptyTaskBoard, TaskBoard } from '@/modules/TaskBoard/model/taskBoard'
import { TaskListInEachColumnRepository } from './taskListInEachColumnRepository'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'

export default class SupabaseTaskListInEachColumnRepository
	implements TaskListInEachColumnRepository
{
	async save(taskListInEachColumn: TaskBoard, boardId: string) {
		if (!isSupabaseConfigured || !supabase) return
		console.log(boardId)
		const { error } = await supabase
			.from('boards')
			.update({
				task_list_in_each_column: taskListInEachColumn,
			})
			.eq('id', boardId)

		if (error) throw error
	}

	async getAll(boardId: string) {
		if (!isSupabaseConfigured || !supabase) return

		const { error, data } = await supabase
			.from('boards')
			.select('task_list_in_each_column')
			.eq('id', boardId)
		console.log(boardId)

		if (error) throw error

		const taskListInColumns = data[0].task_list_in_each_column
		return taskListInColumns ? taskListInColumns : emptyTaskBoard
	}
}
