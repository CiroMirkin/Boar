import { configureStore } from '@reduxjs/toolkit'
import columnListReducer from "./columnListReducer"

export const store = configureStore({
    reducer: {
        columnList: columnListReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch