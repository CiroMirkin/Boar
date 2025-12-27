import { create } from 'zustand'
import { AvailableTags, defaultAvialableTags, Tag } from '../model/tags'

type TagStore = {
	availableTags: AvailableTags
	userSelectedTags: Tag[]
	setUserSelectedTags: (tags: Tag[]) => void
}

export const useTagStore = create<TagStore>((set) => ({
	availableTags: [...defaultAvialableTags],
	userSelectedTags: [],
	setUserSelectedTags: (tags: Tag[]) => {
		set(() => ({
			userSelectedTags: tags,
		}))
	},
}))
