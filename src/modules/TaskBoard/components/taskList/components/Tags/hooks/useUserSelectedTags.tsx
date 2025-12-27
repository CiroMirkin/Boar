import { useTagStore } from '../state/store'
import { Tag } from '../model/tags'

export const useUserSelectedTags = (): Tag[] => {
	const selectedTags = useTagStore((state) => state.userSelectedTags)
	return selectedTags ? selectedTags : []
}
