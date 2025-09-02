import { format } from '@formkit/tempo'
import { LibraryOfArchivedNotes } from '../../model/libraryOfArchivedNotes'

const archiveNote = (library: LibraryOfArchivedNotes, note: string): LibraryOfArchivedNotes => {
	library.archive.unshift({
		date: format(new Date(), { date: 'full' }),
		note: note,
		id: crypto.randomUUID(),
	})
	return library
}

export default archiveNote
