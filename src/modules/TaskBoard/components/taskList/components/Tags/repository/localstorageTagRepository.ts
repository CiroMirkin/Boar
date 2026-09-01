import { defaultAvialableTags, emptyTagGroup } from '../model/tags'
import { TagRepository, TagRepositoryGetReturn, TagRepositorySaveParams } from './tagRepository'

export default class LocalStorageTagRepository implements TagRepository {
	key
	constructor() {
		// sufijo 'boar' (nombre anterior del proyecto): no renombrar para no invalidar el localStorage de usuarios existentes
		this.key = 'tags-boar'
	}
	async save(allTagsInfo: TagRepositorySaveParams): Promise<void> {
		localStorage.setItem(this.key, JSON.stringify(allTagsInfo))
	}

	async get(): Promise<TagRepositoryGetReturn> {
		return localStorage.getItem(this.key)
			? JSON.parse(localStorage.getItem(this.key) as string)
			: {
					tags: defaultAvialableTags,
					actualTagGroup: emptyTagGroup,
				}
	}
}
