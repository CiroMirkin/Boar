import { Column } from '../models/column'
import { ColumnListRepository } from '@/columnList/state/columnListRepository'
import LocalStorageColumnListRepository from '@/columnList/state/localStorageColumnList'
import { addColumnAtTheEnd } from '@/columnList/state/actions/addColumn'
import { changeNameOfColumn } from '@/columnList/state/actions/changeColumnName'
import { deleteThisColumn } from '@/columnList/state/actions/deleteColumn'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { blankReminder, Reminder } from '../models/reminder'
import { createReminder } from './actions/createReminder'

interface InitialState {
	list: Column[]
	reminder: Reminder
}

const columnListRepository: ColumnListRepository = new LocalStorageColumnListRepository()

const initialState: InitialState = {
	list: columnListRepository.getAll(),
	reminder: blankReminder,
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
		addReminder: (state, action: PayloadAction<Reminder>) => {
			const newReminder = action.payload
			state.reminder = createReminder(newReminder)
		},
	},
})

export const { addColumn, deleteColumn, changeColumnName, addReminder } = columnListSlice.actions
export default columnListSlice.reducer
