import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import { LibraryOfArchivedNotes } from '../model/libraryOfArchivedNotes'

export const useLibraryOfArchivedNotes = (): LibraryOfArchivedNotes => {
	return useSelector((state: RootState) => state.archivedNotes.content)
}
