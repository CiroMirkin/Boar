import { configureStore } from '@reduxjs/toolkit'
import columnListReducer from './columnList/state/columnListReducer'
import taskListInEachColumnReducer from './columnList/taskList/state/taskListInEachColumnReducer'
import archiveReducer from './archive/state/archiveReducer'
import boardReducer from './board/state/boardReducer'

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
