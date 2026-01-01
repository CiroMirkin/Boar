import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import { UsageHistory } from '../model/usageHistory'
import { UsageHistoryRepository } from './usageHistoryRepository'

export class SupabaseUsageHistoryRepository implements UsageHistoryRepository {
	private readonly tableName = 'board_accessories'

	async getAll(id: string): Promise<UsageHistory> {
		if (!isSupabaseConfigured || !supabase) return []

		const { data, error } = await supabase
			.from(this.tableName)
			.select('usage_history')
			.eq('id', id)
			.single()

		if (error && error.code !== 'PGRST116') throw error
		return data?.usage_history || []
	}

	async save(history: UsageHistory, id: string): Promise<UsageHistory> {
		if (!isSupabaseConfigured || !supabase) return []

		const { data, error } = await supabase
			.from(this.tableName)
			.upsert({
				id,
				usage_history: history,
			})
			.select()
			.single()

		if (error) throw error
		return data.usage_history
	}
}

export const supabaseUsageHistoryRepository = new SupabaseUsageHistoryRepository()
