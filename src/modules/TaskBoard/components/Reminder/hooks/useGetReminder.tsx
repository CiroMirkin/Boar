import { useSelector } from 'react-redux'
import { Reminder } from '../model/reminder'
import { RootState } from '@/store'

export const useGetReminder = (): Reminder => {
	const reminder = useSelector((state: RootState) => state.reminder).reminder
	return reminder
}
