import { getUserId } from '@/sharedByModules/hooks/useSyncBoard'
import { defaultColumnList } from '../models/columnList'
import { ColumnList } from '../models/columnList'
import { ColumnListRepository } from '../repository/columnListRepository'
import { supabase } from '@/lib/supabase'

export default class SupabaseColumnListRepository implements ColumnListRepository {
	async save(columnList: ColumnList) {
		const user_id = await getUserId()
		const { error } = await supabase
			.from('boards')
			.update({
				column_list: columnList,
			})
			.eq('user_id', user_id)

		if (error) throw error
	}
	async getAll() {
		const user_id = await getUserId()
		const { error, data } = await supabase
			.from('boards')
			.select('column_list')
			.eq('user_id', user_id)

		if (error) throw error

		const columnList = data[0].column_list
		return columnList ? columnList : defaultColumnList
	}
}
