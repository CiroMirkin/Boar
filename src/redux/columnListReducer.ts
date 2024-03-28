import { columnModel, defaultColumnList } from "@/models/column";
import { addColumnAtTheEnd } from "@/useCase/column/addColumn";
import { deleteThisColumn } from "@/useCase/column/deleteColumn";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
    list: columnModel[]
}

const initialState: InitialState = {
    list: defaultColumnList
}

export const columnListSlice = createSlice({
    name: 'columnList',
    initialState,
    reducers: {
        addColumn: (state, action: PayloadAction<columnModel>) => {
            const column = action.payload
            state.list = addColumnAtTheEnd({ column, columnList: state.list})
        },
        deleteColumn: (state, action: PayloadAction<columnModel>) => {
            const column = action.payload
            state.list = deleteThisColumn({ column, columnList: state.list})
        }
    }
})

export const { addColumn, deleteColumn } = columnListSlice.actions
export default columnListSlice.reducer