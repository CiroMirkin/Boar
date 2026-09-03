import { defaultAvialableTags, emptyTagGroup } from '../model/tags'
import { TagRepositoryGetReturn } from '../api/repository/tagRepository'
import { useTagsQuery } from './useTagsQuery'

export const useActualTagGroup = (): TagRepositoryGetReturn => {
	const { tags } = useTagsQuery()
	const actualTagGroup = tags?.actualTagGroup
	const availableTags = tags?.tags
	return {
		tags: availableTags ? availableTags : defaultAvialableTags,
		actualTagGroup: actualTagGroup ? actualTagGroup : emptyTagGroup,
	}
}
