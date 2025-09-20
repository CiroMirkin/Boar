import { getUserId } from '@/auth/utils/getUserId'
import { blankReminder, Reminder } from '../reminder'
import { ReminderRepository } from './ReminderRepository'
import { supabase } from '@/lib/supabase'

export default class SupabaseReminderRepository implements ReminderRepository {
	constructor() {}

	async save(reminder: Reminder): Promise<void> {
		if (JSON.stringify(blankReminder) !== JSON.stringify(reminder)) {
			const user_id = await getUserId()
			const { error } = await supabase
				.from('boards')
				.update({
					reminders: reminder,
				})
				.eq('user_id', user_id)

			if (error) throw error
		}
	}

	async getAll() {
		const user_id = await getUserId()
		const { data, error } = await supabase
			.from('boards')
			.select('reminders')
			.eq('user_id', user_id)

		if (error) throw error

		const reminder = data[0].reminders
		return reminder ? reminder : blankReminder
	}
}
