import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { defaultLibraryOfArchivedNotes, LibraryOfArchivedNotes } from "../model/libraryOfArchivedNotes"
import archiveNote from "./actions/archiveNote"

interface InitialState {
    content: LibraryOfArchivedNotes 
}
const initialState: InitialState = {
    content: {...defaultLibraryOfArchivedNotes}
}

export const archivedNotesSlice = createSlice({
    name: 'archivedNotes',
    initialState,
    reducers: {
        archiveThisNote: (state, action: PayloadAction<string>) => {
            const note = action.payload
            state.content = archiveNote(state.content, note)
        }
    },
})

export const {  archiveThisNote } = archivedNotesSlice.actions
export default archivedNotesSlice.reducer
