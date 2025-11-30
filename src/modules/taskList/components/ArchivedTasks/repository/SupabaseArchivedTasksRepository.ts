import { Archive } from '../models/archive'
import { ArchiveRepository } from './archiveRepository'
import { supabase } from '@/lib/supabase'
import { getActualBoardId } from '@/auth/utils/getActualBoardId'

export default class SupabaseArchivedTasksRepository implements ArchiveRepository {
	constructor() {}
	async save(archive: Archive) {
		const boardId = getActualBoardId()
		const { error } = await supabase
			.from('archive')
			.update({
				task_list: archive,
			})
			.eq('board_id', boardId)

		if (error) throw error
	}

	async getAll() {
		const boardId = getActualBoardId()
		const { data, error } = await supabase
			.from('archive')
			.select('task_list')
			.eq('board_id', boardId)

		if (error) throw error

		const archivedTasks = data[0].task_list
		return archivedTasks ? archivedTasks : []
	}
}
