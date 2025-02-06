import { configureStore } from '@reduxjs/toolkit'
import columnListReducer from './columnList/state/columnListReducer'
import taskListInEachColumnReducer from './columnList/taskList/state/taskListInEachColumnReducer'
import archiveReducer from './archive/state/archiveReducer'
import boardReducer from './board/state/boardReducer'
import configReducer from './board/configs/state/configReducer'

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
