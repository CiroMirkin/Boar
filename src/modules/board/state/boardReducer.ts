import { boardModel } from '@/modules/board/models/board'
import { BoardRepository } from '@/modules/board/models/boardRepository'
import LocalStorageBoardRepository from '@/modules/board/state/localstorageBoard'
import { changeBoardName } from '@/modules/board/state/actions/changeBoardName'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface InitialState {
	board: boardModel
}
const boardRepository: BoardRepository = new LocalStorageBoardRepository()
const initialState: InitialState = {
	board: boardRepository.getAll(),
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
