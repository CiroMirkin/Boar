import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
	defaultAvialableTags,
	Tag,
	AvailableTags,
	TagGroup,
	eisenhowerTagGroup,
} from '../model/tags'
import { addTagGroup } from './actions/addTagGroup'

interface InitialState {
	list: AvailableTags
	actualTagGroup?: TagGroup
	userSelectedTags: Tag[]
}
const initialState: InitialState = {
	list: [...defaultAvialableTags],
	actualTagGroup: { ...eisenhowerTagGroup },
	userSelectedTags: [],
}

export const tagsSlice = createSlice({
	name: 'tags',
	initialState,
	reducers: {
		addTagList: (state, action: PayloadAction<Tag[]>) => {
			state.list = addTagGroup({
				tags: action.payload,
				actualAvailableTags: state.list,
			})
		},
		setUserSelectedTags: (state, action: PayloadAction<Tag[]>) => {
			state.userSelectedTags = [...action.payload]
		},
		changeActualTagGroup: (state, action: PayloadAction<TagGroup>) => {
			state.actualTagGroup = { ...action.payload }
		},
	},
})

export const { addTagList, setUserSelectedTags, changeActualTagGroup } = tagsSlice.actions
export default tagsSlice.reducer
