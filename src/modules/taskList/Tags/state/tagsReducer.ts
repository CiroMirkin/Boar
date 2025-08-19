import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { defaultAvialableTags, Tag, AvailableTags, TagGroup, eisenhowerTagGroup } from '../model/tags'
import { addTagGroup } from './actions/addTagGroup'

interface InitialState {
    list: AvailableTags
    actualTagGroup?: TagGroup
}
const initialState: InitialState = {
    list: [...defaultAvialableTags],
    actualTagGroup: {...eisenhowerTagGroup},
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
    },
})

export const {
    addTagList,
} = tagsSlice.actions
export default tagsSlice.reducer
