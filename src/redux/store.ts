import { configureStore } from '@reduxjs/toolkit'
import columnListReducer from "./columnListReducer"
import taskListInEachColumnReducer from './taskListInEachColumnReducer'
import archiveReducer from './archiveReducer'

export const store = configureStore({
    reducer: {
        columnList: columnListReducer,
        taskListInEachColumn: taskListInEachColumnReducer,
        archive: archiveReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch