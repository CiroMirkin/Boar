import { Reminder } from '../reminder'

export interface ReminderRepository {
	save(reminder: Reminder): void
	getAll(): Promise<Reminder>
}
