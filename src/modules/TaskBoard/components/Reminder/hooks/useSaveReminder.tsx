import LocalStorageReminderRepository from '../repository/LocalStorageReminder'
import { Reminder } from '../model/reminder'
import { useReminderStore } from '../state/store'
import { useSession } from '@/auth/hooks/useSession'
import SupabaseReminderRepository from '../repository/SupabaseReminderRepository'

type UseSaveReminderReturn = (reminder: Reminder) => void

export const useSaveReminder = (): UseSaveReminderReturn => {
	const { session } = useSession()
	const saveInRepository = (reminder: Reminder) => {
		if (session) {
			const localReminder = new LocalStorageReminderRepository().getAll()
			if (JSON.stringify(localReminder) !== JSON.stringify(reminder)) {
				new SupabaseReminderRepository().save(reminder)
			}
		} else {
			new LocalStorageReminderRepository().save(reminder)
		}
	}

	const setReminder = useReminderStore((store) => store.setReminder)
	return (reminder: Reminder) => {
		setReminder(reminder)
		saveInRepository(reminder)
	}
}
