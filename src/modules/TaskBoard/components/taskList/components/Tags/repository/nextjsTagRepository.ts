import { defaultAvialableTags, emptyTagGroup } from '../model/tags'
import { TagRepository, TagRepositoryGetReturn, TagRepositorySaveParams } from './tagRepository'
import { getActiveTagGroup, setActiveTagGroup } from '@/actions/tags'

export default class NextjsTagRepository implements TagRepository {
	async save({ actualTagGroup, boardId }: TagRepositorySaveParams): Promise<void> {
		await setActiveTagGroup({ boardId, tagGroupId: actualTagGroup.id })
	}

	async get(boardId: string): Promise<TagRepositoryGetReturn> {
		const result = await getActiveTagGroup({ boardId })
		return {
			actualTagGroup: result.actualTagGroup ?? emptyTagGroup,
			tags: result.tags ?? defaultAvialableTags,
		}
	}
}
