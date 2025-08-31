import { Tag } from '../model/tags'
import { store } from '@/store'

export const useUserSelectedTags = (): Tag[] => {
	const selectedTags = store.getState().tags.userSelectedTags
	return !!selectedTags ? selectedTags : []
}
