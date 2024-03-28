import { columnModel, defaultColumnList } from "@/models/column";
import { addColumnAtTheEnd } from "@/useCase/column/addColumn";
import { deleteThisColumn } from "@/useCase/column/deleteColumn";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = defaultColumnList

export const columnListSlice = createSlice({
    name: 'columnList',
    initialState,
    reducers: {
        addColumn: (state, action: PayloadAction<columnModel>) => {
            const column = action.payload
            state = addColumnAtTheEnd({ column, columnList: state})
        },
        deleteColumn: (state, action: PayloadAction<columnModel>) => {
            const column = action.payload
            state = deleteThisColumn({ column, columnList: state})
        }
    }
})

export const { addColumn, deleteColumn } = columnListSlice.actions
export default columnListSlice.reducer