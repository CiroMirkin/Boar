import { emptyTaskBoard, TaskBoard } from '../../TaskBoard/model/taskBoard'
import { TaskListInEachColumnRepository } from './taskListInEachColumnRepository'
import { getUserId } from '@/auth/utils/getUserId'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'

export default class SupabaseTaskListInEachColumnRepository
	implements TaskListInEachColumnRepository
{
	async save(taskListInEachColumn: TaskBoard) {
		if (!isSupabaseConfigured || !supabase) return

		const user_id = await getUserId()
		const { error } = await supabase
			.from('boards')
			.update({
				task_list_in_each_column: taskListInEachColumn,
			})
			.eq('user_id', user_id)

		if (error) throw error
	}

	async getAll() {
		if (!isSupabaseConfigured || !supabase) return

		const user_id = await getUserId()
		const { error, data } = await supabase
			.from('boards')
			.select('task_list_in_each_column')
			.eq('user_id', user_id)

		if (error) throw error

		const taskListInColumns = data[0].task_list_in_each_column
		return taskListInColumns ? taskListInColumns : emptyTaskBoard
	}
}
