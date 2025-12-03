import { UsageHistory } from '../model/usageHistory'

export interface UsageHistoryRepository {
	getAll(): Promise<UsageHistory>
	save(history: UsageHistory): Promise<UsageHistory>
}
