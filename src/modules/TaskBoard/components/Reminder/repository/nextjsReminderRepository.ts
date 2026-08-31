import { blankReminder, Reminder } from '../model/reminder'
import { ReminderRepository } from './ReminderRepository'
import { getReminders, saveReminders } from '@/actions/board'

export default class NextjsReminderRepository implements ReminderRepository {
	async save(reminder: Reminder, boardId: string): Promise<void> {
		await saveReminders({ boardId, reminders: reminder })
	}

	async getAll(boardId: string): Promise<Reminder> {
		const reminder = await getReminders({ boardId })
		return reminder ?? blankReminder
	}
}
