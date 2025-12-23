import { getActualBoardId } from '@/auth/utils/getActualBoardId'
import { blankReminder, Reminder } from '../model/reminder'
import { ReminderRepository } from './ReminderRepository'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'

export default class SupabaseReminderRepository implements ReminderRepository {
	constructor() {}

	async save(reminder: Reminder): Promise<void> {
		if (!isSupabaseConfigured || !supabase) return

		const { error } = await supabase
			.from('board_accessories')
			.update({
				reminders: reminder,
			})
			.eq('id', getActualBoardId())

		if (error) throw error
	}

	async getAll() {
		if (!isSupabaseConfigured || !supabase) return

		const { data, error } = await supabase
			.from('board_accessories')
			.select('reminders')
			.eq('id', getActualBoardId())

		if (error) throw error

		const reminder = data[0].reminders
		return reminder ? reminder : blankReminder
	}
}
