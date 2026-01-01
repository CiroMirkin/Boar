import { Reminder } from '../model/reminder'

export interface ReminderRepository {
	save(reminder: Reminder, boardId: string): Promise<void>
	getAll(boardId: string): Promise<Reminder>
}
