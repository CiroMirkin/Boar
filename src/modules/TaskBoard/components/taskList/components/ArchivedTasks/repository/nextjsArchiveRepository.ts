import { Archive } from '../models/archive'
import { ArchiveRepository } from './archiveRepository'
import { getArchive, saveArchive } from '@/actions/archive'

export default class NextjsArchiveRepository implements ArchiveRepository {
	async save(archive: Archive, boardId: string): Promise<void> {
		await saveArchive({ boardId, taskList: archive })
	}

	async getAll(boardId: string): Promise<Archive> {
		const archive = await getArchive({ boardId })
		return archive ?? []
	}
}
