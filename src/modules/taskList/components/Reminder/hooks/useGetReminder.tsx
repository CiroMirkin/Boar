import { useSelector } from 'react-redux'
import { Reminder } from '../reminder'
import { RootState } from '@/store'

export const useGetReminder = (): Reminder => {
	const reminder = useSelector((state: RootState) => state.reminder).reminder
	return reminder
}
