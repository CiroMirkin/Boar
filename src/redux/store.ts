import { configureStore } from '@reduxjs/toolkit'
import columnListReducer from './columnListReducer'
import taskListInEachColumnReducer from './taskListInEachColumnReducer'
import archiveReducer from './archiveReducer'
import boardReducer from '../pages/board/state/boardReducer'
import configReducer from '../pages/configs/state/configReducer'

export const store = configureStore({
	reducer: {
		columnList: columnListReducer,
		taskListInEachColumn: taskListInEachColumnReducer,
		archive: archiveReducer,
		board: boardReducer,
		config: configReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
