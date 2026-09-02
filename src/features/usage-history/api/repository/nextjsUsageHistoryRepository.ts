import { UsageHistory } from '../../model/usageHistory'
import { UsageHistoryRepository } from './usageHistoryRepository'

export class NextjsUsageHistoryRepository implements UsageHistoryRepository {
	async getAll(boardId: string): Promise<UsageHistory> {
		const { getUsageHistory } = await import('../actions/getUsageHistory')
		return getUsageHistory({ boardId })
	}

	async save(history: UsageHistory, boardId: string): Promise<UsageHistory> {
		const { saveUsageHistory } = await import('../actions/saveUsageHistory')
		return saveUsageHistory({ boardId, history })
	}
}

export const nextjsUsageHistoryRepository = new NextjsUsageHistoryRepository()
