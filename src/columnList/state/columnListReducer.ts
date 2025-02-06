import { Column } from '../models/column'
import { ColumnListRepository } from '@/columnList/state/columnListRepository'
import LocalStorageColumnListRepository from '@/columnList/state/localStorageColumnList'
import { addColumnAtTheEnd } from '@/columnList/state/actions/addColumn'
import { changeNameOfColumn } from '@/columnList/state/actions/changeColumnName'
import { deleteThisColumn } from '@/columnList/state/actions/deleteColumn'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface InitialState {
	list: Column[]
}

const columnListRepository: ColumnListRepository = new LocalStorageColumnListRepository()

const initialState: InitialState = {
	list: columnListRepository.getAll(),
}

export const columnListSlice = createSlice({
	name: 'columnList',
	initialState,
	reducers: {
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

export const { addColumn, deleteColumn, changeColumnName } = columnListSlice.actions
export default columnListSlice.reducer
