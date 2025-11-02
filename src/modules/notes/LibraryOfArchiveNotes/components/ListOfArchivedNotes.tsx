import { ReactNode } from 'react'
import ArchivedNote from './ArchivedNote'
import { ArchivedNote as ArchivedNoteModel } from '../model/archivedNote'
import { useTranslation } from 'react-i18next'
import { EmptySpaceText } from '@/ui/atoms/EmptySpaceText'
import { useLibraryOfArchivedNotesQuery } from '../hooks/useLibraryOfArchivedNotesQuery'
import { Spinner } from '@/ui/atoms/spinner'

export function ListOfArchivedNotes() {
	const { archivedNotes, isLoading } = useLibraryOfArchivedNotesQuery()
	const { t } = useTranslation()

	if (isLoading) return <Spinner size={30} />

	const archivedNotesList: ReactNode[] | undefined = archivedNotes?.archive.map(
		(note: ArchivedNoteModel) => (
			<div className='p-0 m-0 w-full' key={note.id}>
				<ArchivedNote note={note} />
			</div>
		)
	)

	return (
		<>
			{archivedNotes?.archive.length == 0 && (
				<EmptySpaceText>{t('archived_note.empty_archive')}</EmptySpaceText>
			)}
			{archivedNotesList}
		</>
	)
}
