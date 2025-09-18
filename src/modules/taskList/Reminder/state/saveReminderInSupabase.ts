import { getUserId } from '@/sharedByModules/hooks/useSyncBoard'
import { blankReminder, Reminder } from '../reminder'
import { supabase } from '@/lib/supabase'

export const saveReminderInSupabase = async (reminder: Reminder) => {
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
