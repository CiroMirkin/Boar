import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLibraryOfArchivedNotes } from '../LibraryOfArchiveNotes/state/useLibraryOfArchivedNotes'
import { useSession } from '@/auth/hooks/useSession'
import { useDispatch } from 'react-redux'
import { archiveThisNote } from '../LibraryOfArchiveNotes/state/archivedNotesReducer'
import { defaultNotes } from '../model/notes'
import { toast } from 'sonner'
import { Button } from '@/ui/atoms/button'
import { ArchiveIcon } from '@/ui/atoms/icons'
import { useLibraryOfArchivedNotesPersister } from '../LibraryOfArchiveNotes/hooks/useLibraryOfArchivedNotesPersister'
import { useNotesQuery } from '../hooks/useNotesQuery'

export function ArchiveNoteBtn() {
	const [taskArchived, setTaskArchived] = useState(false)
	const { notes, updateNotes } = useNotesQuery()
	const { t } = useTranslation()

	const libraryOfArchivedNotes = useLibraryOfArchivedNotes()
	const { persistNotes } = useLibraryOfArchivedNotesPersister()
	const { session } = useSession()
	useEffect(() => {
		const archive = async () => {
			if (notes == '' || notes == '<br>') {
				if (taskArchived) {
					await persistNotes(session, libraryOfArchivedNotes)
					// The notes are already saved by the useNotesQuery mutation
					setTaskArchived(false)
				}
			}
		}

		void archive()
	}, [libraryOfArchivedNotes, session, notes, persistNotes, taskArchived, setTaskArchived])

	const dispatch = useDispatch()
	const handleArchiveNote = () => {
		if (!notes) return
		dispatch(archiveThisNote(notes))
		updateNotes(defaultNotes)
		setTaskArchived(true)
		toast.success(t('archived_note.archive_successful_toast'))
	}

	return (
		<Button variant='ghost' onClick={handleArchiveNote}>
			<ArchiveIcon className='mr-2' />
			{t('archived_note.archive_note_btn')}
		</Button>
	)
}
