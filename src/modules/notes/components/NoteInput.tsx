import { MinimalTiptapEditor } from '@/ui/organisms/MinimalTiptapProps'
import { maxLengthOfNotes, Notes as NotesModel } from '../model/notes'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useNotesQuery } from '../hooks/useNotesQuery'

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

	if (isLoading) return <div>{t('common.loading')}...</div>

	return (
		<>
			<MinimalTiptapEditor
				value={notes || ''}
				onChange={onChange}
				rows={5}
				maxRows={18}
				saveTextCallback={async () => {
					// The mutation is already happening on change, but we can show a toast here.
					toast.success(t('notes.successful_toast'))
				}}
			/>
		</>
	)
}
