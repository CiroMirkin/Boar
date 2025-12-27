import { configureStore } from '@reduxjs/toolkit'
import tagsReducer from '@/modules/TaskBoard/components/taskList/components/Tags/state/tagsReducer'

export const store = configureStore({
	reducer: {
		tags: tagsReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
