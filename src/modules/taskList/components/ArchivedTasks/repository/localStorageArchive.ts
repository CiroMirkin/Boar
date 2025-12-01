import { Archive } from '../models/archive'
import { ArchiveRepository } from './archiveRepository'

export default class LocalStorageArchiveRepository implements ArchiveRepository {
	key
	constructor() {
		this.key = 'tasks-archive'
	}
	async save(archive: Archive) {
		localStorage.setItem(this.key, JSON.stringify(archive))
	}
	getAll() {
		return localStorage.getItem(this.key)
			? JSON.parse(localStorage.getItem(this.key) as string)
			: []
	}
}
