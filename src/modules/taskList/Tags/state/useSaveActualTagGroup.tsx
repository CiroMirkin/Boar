import { useEffect } from 'react'
import { TagGroup, defaultAvialableTags, emptyTagGroup } from '../model/tags'
import { useActualTagGroup } from '../hooks/useActualTagGroup'
import SupabaseTagRepository from '../repository/supabaseTagRepository'

export const useSaveActualTagGroup = () => {
	const actualTagGroup = useActualTagGroup()

	useEffect(() => {
		if (actualTagGroup.id === emptyTagGroup.id) return

		const save = async (tagGroup: TagGroup) => {
			const supabase = new SupabaseTagRepository()
			supabase.save({
				actualTagGroup: tagGroup,
				tags: defaultAvialableTags,
			})
		}
		save(actualTagGroup)
	}, [actualTagGroup])
}
