import { configureStore } from '@reduxjs/toolkit'
import columnListReducer from '../board/columnList/state/columnListReducer'
import taskListInEachColumnReducer from '../board/taskList/state/taskListInEachColumnReducer'
import archiveReducer from './archiveReducer'
import boardReducer from '../board/state/boardReducer'
import configReducer from '../board/configs/state/configReducer'

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
