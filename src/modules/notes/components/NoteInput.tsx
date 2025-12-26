import { MinimalTiptapEditor } from '@/ui/organisms/MinimalTiptapEditor'
import { maxLengthOfNotes } from '../model/notes'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useNotesQuery } from '../hooks/useNotesQuery'
import { Spinner } from '@/ui/atoms/spinner'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ArchiveNoteBtn } from './ArchiveNoteBtn'
import { useTheme } from '@/common/hooks/useTheme'

export function NoteInput() {
	const { t } = useTranslation()
	const { text: textColor } = useTheme()

	const { notes, updateNotes, isLoading } = useNotesQuery()
	const [notesValue, setNotesValue] = useState(notes)
	const isFirstRender = useRef(true)

	const saveNotes = useCallback(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false
			return
		}

		if (notesValue.trim().length <= maxLengthOfNotes) {
			updateNotes(notesValue)
			return
		}

		toast.error(t('notes.warning_length_toast'))
	}, [notesValue, t, updateNotes])

	useEffect(() => {
		if (notesValue !== notes) {
			const timeoutId = setTimeout(saveNotes, 500)
			return () => clearTimeout(timeoutId)
		}
	}, [notesValue, notes, saveNotes])

	useEffect(() => {
		setNotesValue(notes)
	}, [notes])

	if (isLoading) return <Spinner size={30} />

	return (
		<>
			<MinimalTiptapEditor
				value={notesValue}
				onChange={setNotesValue}
				rows={5}
				maxRows={18}
				onSave={() => {
					saveNotes()
					toast.success(t('notes.successful_toast'))
				}}
			/>
			<div className={`w-full py-2 ${textColor}`}>
				<ArchiveNoteBtn setNotesValue={setNotesValue} />
			</div>
		</>
	)
}
