import { useTagStore } from '../state/store'
import { AvailableTags, TagGroup } from '../model/tags'
import { useTranslation } from 'react-i18next'
import { translateTagGroup } from '../model/translateTagGroup'

export const useAvailableTags = (): AvailableTags => {
	const availableTags = useTagStore((state) => state.availableTags)
	const { t } = useTranslation()
	return availableTags.map((tagGroup: TagGroup) => translateTagGroup(tagGroup, t))
}
