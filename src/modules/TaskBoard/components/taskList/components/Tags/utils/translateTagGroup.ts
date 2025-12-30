import { TFunction } from 'i18next'
import { eisenhowerTagGroup, devTagGroup } from '../model/defaultTags'
import { TagGroup } from '../model/tags'

export const translateTagGroup = (tagGroup: TagGroup, t: TFunction) => {
	if (tagGroup.id == eisenhowerTagGroup.id) {
		const [importantTag, necessaryTag, urgentTeg] = tagGroup.tags
		return {
			...tagGroup,
			tags: [
				{
					...importantTag,
					name: t('tags.important_tag'),
				},
				{
					...necessaryTag,
					name: t('tags.necessary_tag'),
				},
				{
					...urgentTeg,
					name: t('tags.urgent_tag'),
				},
			],
		}
	}

	if (tagGroup.id == devTagGroup.id) {
		const [importantTag, necessaryTag, urgentTeg, explorarTag, resolverTag] = tagGroup.tags
		return {
			...tagGroup,
			tags: [
				{
					...importantTag,
					name: t('dev_tags.important_tag'),
				},
				{
					...necessaryTag,
					name: t('dev_tags.necessary_tag'),
				},
				{
					...urgentTeg,
					name: t('dev_tags.urgent_tag'),
				},
				{
					...explorarTag,
					name: t('dev_tags.explore_tag'),
				},
				{
					...resolverTag,
					name: t('dev_tags.resolve_tag'),
				},
			],
		}
	}
	return tagGroup
}
