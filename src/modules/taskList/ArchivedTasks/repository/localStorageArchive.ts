import { Archive } from '@/modules/taskList/ArchivedTasks/models/archive'
import { ArchiveRepository } from './archiveRepository'

export default class LocalStorageArchiveRepository implements ArchiveRepository {
	key
	constructor() {
		this.key = 'tasks-archive'
	}
	save(archive: Archive): void {
		localStorage.setItem(this.key, JSON.stringify(archive))
	}
	getAll(): Archive {
		return localStorage.getItem(this.key)
			? JSON.parse(localStorage.getItem(this.key) as string)
			: []
	}
}
