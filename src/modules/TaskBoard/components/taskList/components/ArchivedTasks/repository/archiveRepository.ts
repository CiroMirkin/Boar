import { Archive } from '../models/archive'

export interface ArchiveRepository {
	save(archive: Archive): Promise<void>
	getAll(): Promise<Archive>
}
