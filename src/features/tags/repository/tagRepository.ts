import { AvailableTags, TagGroup } from '../model/tags'

export interface TagRepositorySaveParams {
	actualTagGroup: TagGroup
	tags: AvailableTags
	boardId: string
}

export interface TagRepositoryGetReturn {
	actualTagGroup: TagGroup
	tags: AvailableTags
}

export interface TagRepository {
	save({ actualTagGroup, tags, boardId }: TagRepositorySaveParams): Promise<void>
	get(boardId: string): Promise<TagRepositoryGetReturn>
}
