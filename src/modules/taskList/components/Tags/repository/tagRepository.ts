import { AvailableTags, TagGroup } from '../model/tags'

export interface TagRepositorySaveParams {
	actualTagGroup: TagGroup
	tags: AvailableTags
}

export interface TagRepositoryGetReturn {
	actualTagGroup: TagGroup
	tags: AvailableTags
}

export interface TagRepository {
	save({ actualTagGroup, tags }: TagRepositorySaveParams): Promise<void>
	get(): Promise<TagRepositoryGetReturn>
}
