import { Archive } from '@/modules/taskList/ArchivedTasks/models/archive'
import { ArchiveRepository } from './archiveRepository'
import { getUserId } from '@/auth/utils/getUserId'
import { supabase } from '@/lib/supabase'

export default class SupabaseArchivedTasksRepository implements ArchiveRepository {
	constructor() {}
	async save(archive: Archive) {
		const user_id = await getUserId()
		const { error } = await supabase
			.from('archive')
			.update({
				task_list: archive,
			})
			.eq('user_id', user_id)

		if (error) throw error
	}

	async getAll() {
		const user_id = await getUserId()
		const { data, error } = await supabase
			.from('archive')
			.select('task_list')
			.eq('user_id', user_id)

		if (error) throw error

		const archivedTasks = data[0].task_list
		return archivedTasks ? archivedTasks : []
	}
}
