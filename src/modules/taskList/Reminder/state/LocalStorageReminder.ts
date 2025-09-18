import { blankReminder, Reminder } from '../reminder'

interface ReminderRepository {
	save(reminder: Reminder): void
	getAll(): Reminder
}

export default class LocalStorageReminderRepository implements ReminderRepository {
	key
	constructor() {
		this.key = 'boar-reminder'
	}
	save(reminder: Reminder): void {
		localStorage.setItem(this.key, JSON.stringify(reminder))
	}
	getAll(): Reminder {
		return localStorage.getItem(this.key)
			? JSON.parse(localStorage.getItem(this.key) as string)
			: blankReminder
	}
}
