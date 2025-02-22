import { RootState } from '@/store'
import { Reminder } from './reminder'
import { useSelector } from 'react-redux'

/** Proporciona toda la información del recordatorio creado por el usuario. */
export const useReminderInfo = (): Reminder => {
	return useSelector((state: RootState) => state.columnList.reminder)
}
