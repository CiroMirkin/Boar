import { useTranslation } from 'react-i18next'

import { defaultNotes } from '../model/notes'
import { toast } from 'sonner'
import { Button } from '@/shared/ui/atoms/button'
import { ArchiveIcon } from '@/shared/ui/atoms/icons'
import { useNotesQuery } from '../hooks/useNotesQuery'
import { useLibraryOfArchivedNotesQuery } from '../hooks/useLibraryOfArchivedNotesQuery'
import { ArchivedNote } from '../model/archivedNote'

interface ArchiveNoteBtnProps {
	setNotesValue: (text: string) => void
}

export function ArchiveNoteBtn({ setNotesValue }: ArchiveNoteBtnProps) {
	const { notes, updateNotes } = useNotesQuery()
	const { t } = useTranslation()

	const { archivedNotes, updateArchivedNotes } = useLibraryOfArchivedNotesQuery()

	const handleArchiveNote = () => {
		if (!notes || notes === '' || notes === '<br>' || !archivedNotes) return

		const newArchivedNote: ArchivedNote = {
			id: crypto.randomUUID(),
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
				setNotesValue(defaultNotes)
				toast.success(t('archived_note.archive_successful_toast'))
			},
		})
	}

	return (
		<Button
			variant='secondary'
			onClick={handleArchiveNote}
			className='w-full'
			data-testid='BotonParaArchiarUnaNota'
		>
			<ArchiveIcon className='mr-2' />
			{t('archived_note.archive_note_btn')}
		</Button>
	)
}
