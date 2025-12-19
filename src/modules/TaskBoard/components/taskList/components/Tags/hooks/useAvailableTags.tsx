import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { AvailableTags, TagGroup } from '../model/tags'
import { devTagGroup, eisenhowerTagGroup } from '../model/defaultTags'
import { useTranslation } from 'react-i18next'
import { TFunction } from 'i18next'

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

export const useAvailableTags = (): AvailableTags => {
	const availableTags = useSelector((state: RootState) => state.tags.list)
	const { t } = useTranslation()
	return availableTags.map((tagGroup) => translateTagGroup(tagGroup, t))
}
