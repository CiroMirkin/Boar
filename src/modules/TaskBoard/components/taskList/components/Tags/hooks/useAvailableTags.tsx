import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { AvailableTags, TagGroup } from '../model/tags'
import { useTranslation } from 'react-i18next'
import { translateTagGroup } from '../utils/translateTagGroup'

export const useAvailableTags = (): AvailableTags => {
	const availableTags = useSelector((state: RootState) => state.tags.list)
	const { t } = useTranslation()
	return availableTags.map((tagGroup: TagGroup) => translateTagGroup(tagGroup, t))
}
