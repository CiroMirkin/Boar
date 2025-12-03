import { UsageHistory } from '../model/usageHistory'
import { UsageHistoryRepository } from './usageHistoryRepository'

export class LocalStorageUsageHistoryRepository implements UsageHistoryRepository {
	key
	constructor() {
		this.key = 'boar-usage-history'
	}
	async getAll(): Promise<UsageHistory> {
		return localStorage.getItem(this.key)
			? JSON.parse(localStorage.getItem(this.key) as string)
			: []
	}

	async save(history: UsageHistory): Promise<UsageHistory> {
		localStorage.setItem(this.key, JSON.stringify(history))
		return this.getAll()
	}
}

export const localStorageUsageHistoryRepository = new LocalStorageUsageHistoryRepository()
