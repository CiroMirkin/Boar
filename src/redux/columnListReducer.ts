import { defaultColumnList } from "@/models/column";
import { createSlice } from "@reduxjs/toolkit";

const initialState = defaultColumnList

export const columnListSlice = createSlice({
    name: 'columnList',
    initialState,
    reducers: {}
})

export default columnListSlice.reducer