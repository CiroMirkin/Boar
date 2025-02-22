import { configureStore } from '@reduxjs/toolkit'
import columnListReducer from './modules/columnList/state/columnListReducer'
import taskListInEachColumnReducer from './modules/taskList/state/taskListInEachColumnReducer'
import archiveReducer from './modules/archive/state/archiveReducer'
import boardReducer from './modules/board/state/boardReducer'

export const store = configureStore({
	reducer: {
		columnList: columnListReducer,
		taskListInEachColumn: taskListInEachColumnReducer,
		archive: archiveReducer,
		board: boardReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
