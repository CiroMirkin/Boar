import { Reminder } from '../model/reminder'
import { useReminderStore } from '../state/store'

export const useGetReminder = (): Reminder => {
	const reminder = useReminderStore((state) => state.reminder)
	return reminder
}
