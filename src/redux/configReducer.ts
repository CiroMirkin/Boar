import { blankReminder, Reminder } from '@/models/reminder'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { createReminder } from './config/createReminder'

interface Config {
	reminder: Reminder
}

interface InitialState extends Config {}
// const boardRepository: BoardRepository = new LocalStorageBoardRepository()
const initialState: InitialState = {
	reminder: blankReminder
}

export const configSlice = createSlice({
	name: 'config',
	initialState,
	reducers: {
		addReminder: (state, action: PayloadAction<Reminder>) => {
			const newReminder = action.payload
			state.reminder = createReminder(newReminder)
		},
	},
})

export const { addReminder } = configSlice.actions
export default configSlice.reducer
