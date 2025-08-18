import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { defaultAvialableTags, Tag, AvailableTags } from '../model/tags'
import { addTagGroup } from './actions/addTagGroup'

interface InitialState {
    list: AvailableTags
}
const initialState: InitialState = {
    list: [...defaultAvialableTags],
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

} = tagsSlice.actions
export default tagsSlice.reducer
