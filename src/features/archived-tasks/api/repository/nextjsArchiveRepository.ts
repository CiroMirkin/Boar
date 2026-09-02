import { Archive } from '../../model/archive'
import { ArchiveRepository } from './archiveRepository'

export default class NextjsArchiveRepository implements ArchiveRepository {
	async save(archive: Archive, boardId: string): Promise<void> {
		const { saveArchive } = await import('../actions/saveArchive')
		await saveArchive({ boardId, taskList: archive })
	}

	async getAll(boardId: string): Promise<Archive> {
		const { getArchive } = await import('../actions/getArchive')
		const archive = await getArchive({ boardId })
		return archive ?? []
	}
}
