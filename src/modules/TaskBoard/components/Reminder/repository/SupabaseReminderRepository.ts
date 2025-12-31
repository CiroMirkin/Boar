import { blankReminder, Reminder } from '../model/reminder'
import { ReminderRepository } from './ReminderRepository'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'

export default class SupabaseReminderRepository implements ReminderRepository {
	async save(reminder: Reminder, boardId: string): Promise<void> {
		if (!isSupabaseConfigured || !supabase) return

		const { error } = await supabase
			.from('board_accessories')
			.update({
				reminders: reminder,
			})
			.eq('id', boardId)

		if (error) throw error
	}

	async getAll(boardId: string) {
		if (!isSupabaseConfigured || !supabase) return blankReminder

		const { data, error } = await supabase
			.from('board_accessories')
			.select('reminders')
			.eq('id', boardId)

		if (error) throw error

		const reminder = data[0].reminders
		return reminder ? reminder : blankReminder
	}
}
