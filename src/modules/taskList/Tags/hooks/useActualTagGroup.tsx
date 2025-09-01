import { useSelector } from 'react-redux'
import { emptyTagGroup, TagGroup } from '../model/tags'
import { RootState } from '@/store'

export const useActualTagGroup = (): TagGroup => {
	const actualTagGroup = useSelector((state: RootState) => state.tags.actualTagGroup)
	return ( actualTagGroup && JSON.stringify(actualTagGroup).length > 2 ) 
		? actualTagGroup 
		: emptyTagGroup
}
