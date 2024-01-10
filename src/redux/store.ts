import { configureStore } from "@reduxjs/toolkit";
import columnsReducer from './columnsSlice'

export const store = configureStore({
  reducer: {
    columns: columnsReducer
  },
});