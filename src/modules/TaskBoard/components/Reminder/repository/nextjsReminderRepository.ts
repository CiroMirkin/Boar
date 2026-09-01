import { blankReminder, Reminder } from '../model/reminder'
import { ReminderRepository } from './ReminderRepository'

export default class NextjsReminderRepository implements ReminderRepository {
	async save(reminder: Reminder, boardId: string): Promise<void> {
		const { saveReminders } = await import('@/actions/board')
		await saveReminders({ boardId, reminders: reminder })
	}

	async getAll(boardId: string): Promise<Reminder> {
		const { getReminders } = await import('@/actions/board')
		const reminder = await getReminders({ boardId })
		return reminder ?? blankReminder
	}
}
