import { useEffect } from 'react'
import { TagGroup, emptyTagGroup } from '../model/tags'
import { useActualTagGroup } from '../hooks/useActualTagGroup'
import { saveActualTagGroupInSupabase } from './tagGroupRepository'

export const useSaveActualTagGroup = () => {
	const actualTagGroup = useActualTagGroup()

	useEffect(() => {
		if (actualTagGroup.id === emptyTagGroup.id) return

		const save = async (tagGroup: TagGroup) => {
			saveActualTagGroupInSupabase(tagGroup)
		}
		save(actualTagGroup)
	}, [actualTagGroup])
}
