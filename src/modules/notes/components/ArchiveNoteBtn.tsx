import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLibraryOfArchivedNotes } from '../LibraryOfArchiveNotes/state/useLibraryOfArchivedNotes'
import { useSession } from '@/auth/hooks/useSession'
import { useDispatch } from 'react-redux'
import { archiveThisNote } from '../LibraryOfArchiveNotes/state/archivedNotesReducer'
import { useNote } from '../hooks/useNote'
import { defaultNotes } from '../model/notes'
import { toast } from 'sonner'
import { Button } from '@/ui/atoms/button'
import { ArchiveIcon } from '@/ui/atoms/icons'
import { useLibraryOfArchivedNotesPersister } from '../LibraryOfArchiveNotes/repository/useLibraryOfArchivedNotesPersister'
import { notesRepositoryFactory } from '../repository/notesRepositoryFactory'

export function ArchiveNoteBtn() {
	const [taskArchived, setTaskArchived] = useState(false)
	const { note, setNote } = useNote()
	const { t } = useTranslation()

	const libraryOfArchivedNotes = useLibraryOfArchivedNotes()
	const { persistNotes } = useLibraryOfArchivedNotesPersister()
	const { session } = useSession()
	useEffect(() => {
		const archive = async () => {
			if (note == '' || note == '<br>') {
				if (taskArchived) {
					await persistNotes(session, libraryOfArchivedNotes)
					const notesRepository = notesRepositoryFactory(session)
					notesRepository.save(note)
					setTaskArchived(false)
				}
			}
		}

		void archive()
	}, [libraryOfArchivedNotes, session, note, persistNotes, taskArchived, setTaskArchived])

	const dispatch = useDispatch()
	const handleArchiveNote = () => {
		dispatch(archiveThisNote(note))
		setNote(defaultNotes)
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
