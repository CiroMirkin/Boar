import { blankReminder, Reminder } from '../reminder'
import { ReminderRepository } from './ReminderRepository'

export default class LocalStorageReminderRepository implements ReminderRepository {
	key
	constructor() {
		this.key = 'boar-reminder'
	}
	save(reminder: Reminder): void {
		localStorage.setItem(this.key, JSON.stringify(reminder))
	}
	getAll() {
		return localStorage.getItem(this.key)
			? JSON.parse(localStorage.getItem(this.key) as string)
			: blankReminder
	}
}
