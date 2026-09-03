import { UsageHistory, migrateUsageHistory } from '../../model/usageHistory'
import { UsageHistoryRepository } from './usageHistoryRepository'

export class LocalStorageUsageHistoryRepository implements UsageHistoryRepository {
	key
	constructor() {
		// prefijo 'boar-' (nombre anterior del proyecto): no renombrar para no invalidar el localStorage de usuarios existentes
		this.key = 'boar-usage-history'
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
