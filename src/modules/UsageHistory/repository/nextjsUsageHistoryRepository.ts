import { UsageHistory } from '../model/usageHistory'
import { UsageHistoryRepository } from './usageHistoryRepository'
import { getUsageHistory, saveUsageHistory } from '@/actions/board'

export class NextjsUsageHistoryRepository implements UsageHistoryRepository {
	async getAll(boardId: string): Promise<UsageHistory> {
		return getUsageHistory({ boardId })
	}

	async save(history: UsageHistory, boardId: string): Promise<UsageHistory> {
		return saveUsageHistory({ boardId, history })
	}
}

export const nextjsUsageHistoryRepository = new NextjsUsageHistoryRepository()
