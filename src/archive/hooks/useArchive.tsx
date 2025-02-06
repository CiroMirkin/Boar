import { Archive } from '@/archive/models/archive'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'

export const useArchive = (): Archive => {
	return useSelector((state: RootState) => state.archive.list)
}
