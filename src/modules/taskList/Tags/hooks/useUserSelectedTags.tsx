import { useSelector } from 'react-redux'
import { Tag } from '../model/tags'
import { RootState } from '@/store'

export const useUserSelectedTags = (): Tag[] => {
	const selectedTags = useSelector((state: RootState) => state.tags.userSelectedTags)
	return selectedTags ? selectedTags : []
}
