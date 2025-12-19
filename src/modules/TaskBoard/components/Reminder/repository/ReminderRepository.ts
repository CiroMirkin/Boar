import { Reminder } from '../model/reminder'

export interface ReminderRepository {
	save(reminder: Reminder): Promise<void>
	getAll(): Promise<Reminder>
}
