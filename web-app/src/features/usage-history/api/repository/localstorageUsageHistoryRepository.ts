import { UsageHistory, migrateUsageHistory } from '../../model/usageHistory'
import { UsageHistoryRepository } from './usageHistoryRepository'

export class LocalStorageUsageHistoryRepository implements UsageHistoryRepository {
	key
	constructor() {
		this.key = 'capo-usage-history'
	}
	async getAll(): Promise<UsageHistory> {
		const rawData = localStorage.getItem(this.key)
			? JSON.parse(localStorage.getItem(this.key) as string)
			: []
		return migrateUsageHistory(rawData)
	}

	async save(history: UsageHistory): Promise<UsageHistory> {
		localStorage.setItem(this.key, JSON.stringify(history))
		return this.getAll()
	}
}

export const localStorageUsageHistoryRepository = new LocalStorageUsageHistoryRepository()
