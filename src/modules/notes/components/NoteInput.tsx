import { MinimalTiptapEditor } from '@/ui/organisms/MinimalTiptapEditor'
import { maxLengthOfNotes, Notes as NotesModel } from '../model/notes'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useNotesQuery } from '../hooks/useNotesQuery'
import { Spinner } from '@/ui/atoms/spinner'

export function NoteInput() {
	const { t } = useTranslation()
	const { notes, updateNotes, isLoading } = useNotesQuery()

	const onChange = (newText: NotesModel) => {
		if (newText.trim().length <= maxLengthOfNotes) {
			updateNotes(newText)
			return
		}

		toast.error(t('notes.warning_length_toast'))
	}

	if (isLoading) return <Spinner size={30} />

	return (
		<>
			<MinimalTiptapEditor
				value={notes || ''}
				onChange={onChange}
				rows={5}
				maxRows={18}
				saveTextCallback={() => {
					toast.success(t('notes.successful_toast'))
				}}
			/>
		</>
	)
}
