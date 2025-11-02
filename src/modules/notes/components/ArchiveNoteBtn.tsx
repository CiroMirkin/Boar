import { useTranslation } from 'react-i18next'

import { defaultNotes } from '../model/notes'
import { toast } from 'sonner'
import { Button } from '@/ui/atoms/button'
import { ArchiveIcon } from '@/ui/atoms/icons'
import { useNotesQuery } from '../hooks/useNotesQuery'
import { useLibraryOfArchivedNotesQuery } from '../LibraryOfArchiveNotes/hooks/useLibraryOfArchivedNotesQuery'
import { ArchivedNote } from '../LibraryOfArchiveNotes/model/archivedNote'
import { v4 as uuidv4 } from 'uuid'

export function ArchiveNoteBtn() {
	const { notes, updateNotes } = useNotesQuery()
	const { t } = useTranslation()

	const { archivedNotes, updateArchivedNotes } = useLibraryOfArchivedNotesQuery()

	const handleArchiveNote = () => {
		if (!notes || notes === '' || notes === '<br>' || !archivedNotes) return

		const newArchivedNote: ArchivedNote = {
			id: uuidv4(),
			note: notes,
			date: new Date(),
		}

		const newLibrary = {
			...archivedNotes,
			archive: [newArchivedNote, ...archivedNotes.archive],
		}

		updateNotes(defaultNotes, {
			onSuccess: () => {
				updateArchivedNotes(newLibrary)
				toast.success(t('archived_note.archive_successful_toast'))
			},
		})
	}

	return (
		<Button variant='ghost' onClick={handleArchiveNote}>
			<ArchiveIcon className='mr-2' />
			{t('archived_note.archive_note_btn')}
		</Button>
	)
}
