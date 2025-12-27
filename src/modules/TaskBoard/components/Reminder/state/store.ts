import { create } from 'zustand'
import { blankReminder, Reminder } from '../model/reminder'

type ReminderStore = {
	reminder: Reminder
	setReminder: (reminder: Reminder) => void
}

export const useReminderStore = create<ReminderStore>((set) => ({
	reminder: { ...blankReminder },
	setReminder: (reminder: Reminder) => {
		set(() => ({
			reminder,
		}))
	},
}))
