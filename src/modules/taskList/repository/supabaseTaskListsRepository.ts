import { TaskListInEachColumn, emptyTaskListInEachColumn } from '@/modules/taskList/models/taskList'
import { TaskListInEachColumnRepository } from './taskListInEachColumnRepository'
import { getUserId } from '@/sharedByModules/hooks/getUserId'
import { supabase } from '@/lib/supabase'

export default class SupabaseTaskListInEachColumnRepository
	implements TaskListInEachColumnRepository
{
	async save(taskListInEachColumn: TaskListInEachColumn) {
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
		const user_id = await getUserId()
		const { error, data } = await supabase
			.from('boards')
			.select('task_list_in_each_column')
			.eq('user_id', user_id)

		if (error) throw error

		const taskListInColumns = data[0].task_list_in_each_column
		return taskListInColumns ? taskListInColumns : emptyTaskListInEachColumn
	}
}
