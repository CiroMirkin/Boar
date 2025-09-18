import LocalStorageReminderRepository from '../state/LocalStorageReminder'
import { Reminder } from '../reminder'
import { useDispatch } from 'react-redux'
import { setReminder } from '../state/reminderReducer'

type UseSaveReminderReturn = (reminder: Reminder) => void

export const useSaveReminder = (): UseSaveReminderReturn => {
	const dispatch = useDispatch()
	return (reminder: Reminder) => {
		dispatch(setReminder(reminder))
		new LocalStorageReminderRepository().save(reminder)
	}
}
