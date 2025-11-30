import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { defaultAvialableTags, Tag, AvailableTags } from '../model/tags'

interface InitialState {
	list: AvailableTags
	userSelectedTags: Tag[]
}
const initialState: InitialState = {
	list: [...defaultAvialableTags],
	userSelectedTags: [],
}

export const tagsSlice = createSlice({
	name: 'tags',
	initialState,
	reducers: {
		setUserSelectedTags: (state, action: PayloadAction<Tag[]>) => {
			state.userSelectedTags = [...action.payload]
		},
	},
})

export const { setUserSelectedTags } = tagsSlice.actions
export default tagsSlice.reducer
