import { getUserId } from '@/sharedByModules/hooks/useSyncUserBoard'
import { supabase } from '@/lib/supabase'
import { ColumnList } from '../models/columnList'

export const sendForSaveColumnList = async (list: ColumnList) => {
	const user_id = await getUserId()
	const { error } = await supabase
		.from('boards')
		.update({
			column_list: list,
		})
		.eq('user_id', user_id)

	if (error) throw error
}
