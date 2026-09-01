import { Archive } from '../models/archive'
import { ArchiveRepository } from './archiveRepository'

export default class NextjsArchiveRepository implements ArchiveRepository {
	async save(archive: Archive, boardId: string): Promise<void> {
		const { saveArchive } = await import('@/actions/archive')
		await saveArchive({ boardId, taskList: archive })
	}

	async getAll(boardId: string): Promise<Archive> {
		const { getArchive } = await import('@/actions/archive')
		const archive = await getArchive({ boardId })
		return archive ?? []
	}
}
