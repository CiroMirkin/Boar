import { configureStore } from "@reduxjs/toolkit";
import columnsReducer from './columnsSlice'

export const store = configureStore({
  reducer: {
    columns: columnsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch