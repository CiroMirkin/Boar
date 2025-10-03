import { Archive } from './archive'

export interface ArchiveRepository {
	save(archive: Archive): void
	getAll(): Archive
}
