import { boardModel, defaultBoard } from '@/modules/board/models/board'
import { changeBoardName } from '@/modules/board/state/actions/changeBoardName'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface InitialState {
	board: boardModel
}
const initialState: InitialState = {
	board: defaultBoard,
}

export const boardSlice = createSlice({
	name: 'board',
	initialState,
	reducers: {
		setBoar: (state, action: PayloadAction<string>) => {
			state.board.name = action.payload
		},
		changeTheNameOfTheBoard: (state, action: PayloadAction<string>) => {
			const newName = action.payload
			state.board = changeBoardName({ board: state.board, newName })
		},
	},
})

export const { changeTheNameOfTheBoard, setBoar } = boardSlice.actions
export default boardSlice.reducer
