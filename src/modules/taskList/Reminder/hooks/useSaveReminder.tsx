import LocalStorageReminderRepository from '../state/LocalStorageReminder'
import { Reminder } from '../reminder'
import { useDispatch } from 'react-redux'
import { setReminder } from '../state/reminderReducer'
import { useSession } from '@/SessionProvider'
import { saveReminderInSupabase } from '../state/saveReminderInSupabase'

type UseSaveReminderReturn = (reminder: Reminder) => void

export const useSaveReminder = (): UseSaveReminderReturn => {
	const { session } = useSession()
	const saveInRepository = (reminder: Reminder) => {
		if (session) {
			const localReminder = new LocalStorageReminderRepository().getAll()
			if (JSON.stringify(localReminder) !== JSON.stringify(reminder)) {
				saveReminderInSupabase(reminder)
			}
		} else {
			new LocalStorageReminderRepository().save(reminder)
		}
	}

	const dispatch = useDispatch()
	return (reminder: Reminder) => {
		dispatch(setReminder(reminder))
		saveInRepository(reminder)
	}
}
