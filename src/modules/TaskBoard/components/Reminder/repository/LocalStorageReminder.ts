import { blankReminder, Reminder } from '../model/reminder'
import { ReminderRepository } from './ReminderRepository'

export default class LocalStorageReminderRepository implements ReminderRepository {
	key
	constructor() {
		// prefijo 'boar-' (nombre anterior del proyecto): no renombrar para no invalidar el localStorage de usuarios existentes
		this.key = 'boar-reminder'
	}
	async save(reminder: Reminder): Promise<void> {
		localStorage.setItem(this.key, JSON.stringify(reminder))
	}
	async getAll() {
		return localStorage.getItem(this.key)
			? JSON.parse(localStorage.getItem(this.key) as string)
			: blankReminder
	}
}
