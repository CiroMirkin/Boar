import { boardModel } from '@/modules/board/models/board'
import { BoardRepository } from '@/modules/board/models/boardRepository'
import LocalStorageBoardRepository from '@/modules/board/state/localstorageBoard'
import { changeBoardName } from '@/modules/board/state/actions/changeBoardName'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface InitialState extends boardModel {}
const boardRepository: BoardRepository = new LocalStorageBoardRepository()
const initialState: InitialState = boardRepository.getAll()

export const boardSlice = createSlice({
	name: 'board',
	initialState,
	reducers: {
		changeTheNameOfTheBoard: (state, action: PayloadAction<string>) => {
			const newName = action.payload
			state = changeBoardName({ board: state, newName })
		},
	},
})

export const { changeTheNameOfTheBoard } = boardSlice.actions
export default boardSlice.reducer
