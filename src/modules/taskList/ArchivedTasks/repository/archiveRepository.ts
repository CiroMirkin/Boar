import { Archive } from '../models/archive'

export interface ArchiveRepository {
	save(archive: Archive): void
	getAll(): Archive
}
