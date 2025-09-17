import { supabase } from '@/lib/supabase'
import { getUserId } from '@/sharedByModules/hooks/useSyncBoard'
import { TagGroup } from '../model/tags'

export const saveActualTagGroupInSupabase = async (actualTagGroup: TagGroup) => {
	const user_id = await getUserId()
	if (!user_id) {
		console.error('User not found')
		return
	}
	const { error } = await supabase
		.from('boards')
		.update({
			actual_tag_group: actualTagGroup,
		})
		.eq('user_id', user_id)

	if (error) throw error
}
