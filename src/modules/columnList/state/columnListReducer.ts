import { Column } from '../models/column'
import { addColumnAtTheEnd } from '@/modules/columnList/state/actions/addColumn'
import { changeNameOfColumn } from '@/modules/columnList/state/actions/changeColumnName'
import { deleteThisColumn } from '@/modules/columnList/state/actions/deleteColumn'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ColumnList, defaultColumnList } from '../models/columnList'
import { TypeOfView } from '../models/TypeOfView'

interface InitialState {
	list: Column[]
	view: TypeOfView
}
const initialState: InitialState = {
	list: defaultColumnList,
	view: "BOARD",
}

export const columnListSlice = createSlice({
	name: 'columnList',
	initialState,
	reducers: {
		toggleView: (state) => {
			state.view = state.view == 'BOARD' ? 'LIST' : 'BOARD'
		},
		setColumnList: (state, action: PayloadAction<ColumnList>) => {
			state.list = action.payload
		},
		addColumn: (state, action: PayloadAction<Column>) => {
			const column = action.payload
			state.list = addColumnAtTheEnd({ column, columnList: state.list })
		},
		deleteColumn: (state, action: PayloadAction<Column>) => {
			const column = action.payload
			state.list = deleteThisColumn({ column, columnList: state.list })
		},
		changeColumnName: (
			state,
			action: PayloadAction<{ column: Column; newColumnName: string }>
		) => {
			const { newColumnName, column } = action.payload
			state.list = changeNameOfColumn({
				newName: newColumnName,
				column,
				columnList: state.list,
			})
		},
	},
})

export const { toggleView, addColumn, deleteColumn, changeColumnName, setColumnList } = columnListSlice.actions
export default columnListSlice.reducer
