import { Archive } from '../../model/archive'

export interface ArchiveRepository {
	save(archive: Archive, boardId: string): Promise<void>
	getAll(boardId: string): Promise<Archive>
}
