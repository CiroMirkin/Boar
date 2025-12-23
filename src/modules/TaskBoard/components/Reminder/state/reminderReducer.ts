import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { blankReminder, Reminder } from '../model/reminder'

interface InitialState {
	reminder: Reminder
}
const initialState: InitialState = {
	reminder: blankReminder,
}

export const reminderSlice = createSlice({
	name: 'reminders',
	initialState,
	reducers: {
		setReminder: (state, action: PayloadAction<Reminder>) => {
			state.reminder = action.payload
		},
	},
})

export const { setReminder } = reminderSlice.actions
export default reminderSlice.reducer
