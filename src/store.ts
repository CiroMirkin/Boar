import { configureStore } from '@reduxjs/toolkit'
import tagsReducer from './modules/taskList/components/Tags/state/tagsReducer'
import reminderReducer from './modules/taskList/Reminder/state/reminderReducer'

export const store = configureStore({
	reducer: {
		tags: tagsReducer,
		reminder: reminderReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
