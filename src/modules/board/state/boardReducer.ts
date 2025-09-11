import { boardModel, defaultBoard } from '@/modules/board/models/board'
import { changeBoardName } from '@/modules/board/state/actions/changeBoardName'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface InitialState {
	board: boardModel,
	isLoading: boolean,
}
const initialState: InitialState = {
	board: defaultBoard,
	isLoading: true,
}

export const boardSlice = createSlice({
	name: 'board',
	initialState,
	reducers: {
		setIsLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload
		},
		setBoar: (state, action: PayloadAction<string>) => {
			state.board.name = action.payload
		},
		changeTheNameOfTheBoard: (state, action: PayloadAction<string>) => {
			const newName = action.payload
			state.board = changeBoardName({ board: state.board, newName })
		},
	},
})

export const { changeTheNameOfTheBoard, setBoar, setIsLoading, } = boardSlice.actions
export default boardSlice.reducer
