import { configureStore } from '@reduxjs/toolkit'
import tagsReducer from '@/modules/TaskBoard/components/taskList/components/Tags/state/tagsReducer'
import reminderReducer from '@/modules/TaskBoard/components/taskList/components/Reminder/state/reminderReducer'

export const store = configureStore({
	reducer: {
		tags: tagsReducer,
		reminder: reminderReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
