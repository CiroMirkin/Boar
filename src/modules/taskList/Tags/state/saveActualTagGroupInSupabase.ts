import { supabase } from '@/lib/supabase'
import { getActualBoardId } from '@/auth/utils/getActualBoardId'
import { TagGroup } from '../model/tags'

export const saveActualTagGroupInSupabase = async (actualTagGroup: TagGroup) => {
	const { error } = await supabase
		.from('board_accessories')
		.update({
			actual_tag_group: actualTagGroup,
		})
		.eq('id', getActualBoardId())

	if (error) throw error
}
