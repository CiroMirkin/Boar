import { useEffect } from 'react'
import RichTextEditor from '@/ui/organisms/RichTextEditor/RichTextEditor'
import { defaultNotes, maxLengthOfNotes, Notes as NotesModel } from '../model/notes'
import { useSession } from '@/auth/hooks/useSession'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useNote } from '../hooks/useNote'
import { notesRepositoryFactory } from '../repository/notesRepositoryFactory'

export function NoteInput() {
	const { note, setNote } = useNote()
	const { t } = useTranslation()

	const { session } = useSession()
	useEffect(() => {
		const notesRepository = notesRepositoryFactory(session)
		const loadNotes = async () => {
			const notes = await notesRepository.getAll()
			if (notes !== defaultNotes) {
				setNote(notes)
			}
		}
		void loadNotes()
	}, [session, setNote])

	const onChange = (newText: NotesModel) => {
		if (newText.trim().length <= maxLengthOfNotes) {
			setNote(newText)
			handleSaveNotes(newText)
			return
		}

		toast.error(t('notes.warning_length_toast'))
	}

	const handleSaveNotes = async (newNote: NotesModel) => {
		const notesRepository = notesRepositoryFactory(session)
		await notesRepository.save(newNote)
	}

	return (
		<>
			<RichTextEditor
				value={note}
				onChange={onChange}
				rows={5}
				maxRows={18}
				saveTextCallback={async () => {
					await handleSaveNotes(note)
					toast.success(t('notes.successful_toast'))
				}}
			/>
		</>
	)
}
