import { boardModel } from '@/modules/board/models/board'
import { BoardRepository } from '@/modules/board/models/boardRepository'
import LocalStorageBoardRepository from '@/modules/board/state/localstorageBoard'
import { changeBoardName } from '@/modules/board/state/actions/changeBoardName'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ColorTheme, defaultColorTheme } from '@/modules/shared/configs/colors'

interface InitialState {
	board: boardModel
	colorTheme: ColorTheme
}
const boardRepository: BoardRepository = new LocalStorageBoardRepository()
const initialState: InitialState = {
	colorTheme: {...defaultColorTheme},
	board: boardRepository.getAll(),
}

export const boardSlice = createSlice({
	name: 'board',
	initialState,
	reducers: {
		changeTheNameOfTheBoard: (state, action: PayloadAction<string>) => {
			const newName = action.payload
			state.board = changeBoardName({ board: state.board, newName })
		},
		setColorTheme: (state, action: PayloadAction<ColorTheme>) => {
			const { bg, text } = action.payload
			state.colorTheme.bg = bg
			state.colorTheme.text = text
		},
	},
})

export const { changeTheNameOfTheBoard, setColorTheme } = boardSlice.actions
export default boardSlice.reducer
