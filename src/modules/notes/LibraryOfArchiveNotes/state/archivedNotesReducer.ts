import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	defaultLibraryOfArchivedNotes,
	LibraryOfArchivedNotes,
} from '../model/libraryOfArchivedNotes'
import archiveNote from './actions/archiveNote'

interface InitialState {
	content: LibraryOfArchivedNotes
}
const initialState: InitialState = {
	content: { ...defaultLibraryOfArchivedNotes },
}

export const archivedNotesSlice = createSlice({
	name: 'archivedNotes',
	initialState,
	reducers: {
		setArchivedNotes: (state, action: PayloadAction<LibraryOfArchivedNotes>) => {
			state.content = action.payload
		},
		archiveThisNote: (state, action: PayloadAction<string>) => {
			const note = action.payload
			state.content = archiveNote(state.content, note)
		},
	},
})

export const { archiveThisNote, setArchivedNotes } = archivedNotesSlice.actions
export default archivedNotesSlice.reducer
