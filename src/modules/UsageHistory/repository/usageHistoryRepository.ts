import { UsageHistory } from '../model/usageHistory'

export interface UsageHistoryRepository {
	getAll(boardId: string): Promise<UsageHistory>
	save(history: UsageHistory, boardId: string): Promise<UsageHistory>
}
