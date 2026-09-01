import { defaultAvialableTags, emptyTagGroup } from '../model/tags'
import { TagRepository, TagRepositoryGetReturn, TagRepositorySaveParams } from './tagRepository'

export default class NextjsTagRepository implements TagRepository {
	async save({ actualTagGroup, boardId }: TagRepositorySaveParams): Promise<void> {
		const { setActiveTagGroup } = await import('@/actions/tags')
		await setActiveTagGroup({ boardId, tagGroupId: actualTagGroup.id })
	}

	async get(boardId: string): Promise<TagRepositoryGetReturn> {
		const { getActiveTagGroup } = await import('@/actions/tags')
		const result = await getActiveTagGroup({ boardId })
		return {
			actualTagGroup: result.actualTagGroup ?? emptyTagGroup,
			tags: result.tags ?? defaultAvialableTags,
		}
	}
}
