import { createContext, Dispatch, SetStateAction } from 'react'
import { blankReminder, Reminder } from './reminder'

interface ReminderContextData {
	reminder: Reminder
	setReminder: Dispatch<SetStateAction<Reminder>>
}

const defaultReminderContextValue: ReminderContextData = {
	reminder: blankReminder,
	setReminder: () => {},
}

export const ReminderContext = createContext(defaultReminderContextValue)

interface ReminderProviderProps {
	children: React.ReactNode
	reminderData: ReminderContextData
}

export function ReminderProvider({ children, reminderData }: ReminderProviderProps) {
	return <ReminderContext.Provider value={reminderData}>{children}</ReminderContext.Provider>
}
