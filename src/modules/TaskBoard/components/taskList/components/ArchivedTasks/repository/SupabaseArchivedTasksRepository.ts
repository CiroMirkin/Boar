import { Archive } from '../models/archive'
import { ArchiveRepository } from './archiveRepository'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'

export default class SupabaseArchivedTasksRepository implements ArchiveRepository {
	async save(archive: Archive, boardId: string) {
		if (!isSupabaseConfigured || !supabase) return

		const { error } = await supabase
			.from('archive')
			.upsert({
				task_list: archive,
				board_id: boardId,
			})
			.eq('board_id', boardId)

		if (error) throw error
	}

	async getAll(boardId: string) {
		if (!isSupabaseConfigured || !supabase) return []

		const { data, error } = await supabase
			.from('archive')
			.select('task_list')
			.eq('board_id', boardId)

		if (!data) {
			await this.save([], boardId)
			return []
		}

		if (error) {
			throw error
		}
		const archivedTasks = data[0].task_list || []
		return archivedTasks
	}
}
