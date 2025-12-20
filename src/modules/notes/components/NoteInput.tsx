import { MinimalTiptapEditor } from '@/ui/organisms/MinimalTiptapEditor'
import { maxLengthOfNotes } from '../model/notes'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useNotesQuery } from '../hooks/useNotesQuery'
import { Spinner } from '@/ui/atoms/spinner'
import { useCallback, useEffect, useState } from 'react'

export function NoteInput() {
	const { t } = useTranslation()
	const { notes, updateNotes, isLoading } = useNotesQuery()
	const [notesValue, setNotesValue] = useState(notes)

	const saveNotes = useCallback(() => {
		if (notesValue.trim().length <= maxLengthOfNotes) {
			updateNotes(notesValue)
			toast.success(t('notes.successful_toast'))
			return
		}

		toast.error(t('notes.warning_length_toast'))
	}, [notesValue, t, updateNotes])

	useEffect(() => {
		if (notesValue !== notes) {
			const timeoutId = setTimeout(() => {
				saveNotes()
			}, 500)
			return () => clearTimeout(timeoutId)
		}
	}, [notesValue, notes, saveNotes])

	if (isLoading) return <Spinner size={30} />

	return (
		<>
			<MinimalTiptapEditor
				value={notes}
				onChange={setNotesValue}
				rows={5}
				maxRows={18}
				onSave={saveNotes}
			/>
		</>
	)
}
