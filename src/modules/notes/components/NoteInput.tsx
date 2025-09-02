import { useEffect } from 'react'
import RichTextEditor from '../RichTextEditor/RichTextEditor'
import { defaultNotes, maxLengthOfNotes, Notes as NotesModel } from '../model/notes'
import { useSession } from '@/SessionProvider'
import { getNotesFromSupabase } from '../repository/getNotesFromSupabase'
import LocalStorageNotesRepository from '../repository/LocalStorageNotesRepository'
import { useSaveNotes } from '../repository/useSavedNote'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useNote } from '../NoteProvider'

export function NoteInput() {
	const { note, setNote } = useNote()
	const { t } = useTranslation()

	const { session } = useSession()
	useEffect(() => {
		if (session) {
			getNotesFromSupabase({ setNotes: setNote })
		} else {
			const lg = new LocalStorageNotesRepository()
			const notesFromLocalStotage = lg.getAll()
			notesFromLocalStotage == defaultNotes ? lg.save(note) : setNote(notesFromLocalStotage)
		}
	}, [session])

	const onChange = (newText: NotesModel) => {
		if (newText.trim().length <= maxLengthOfNotes) {
			console.log(newText, newText.trim().length)
			setNote(newText)
			handleSaveNotes(newText)
			console.log(note)
			return
		}

		toast.error(t('notes.warning_length_toast'))
	}

	const handleSaveNotes = (newNote: NotesModel) => {
		useSaveNotes({ session, notes: newNote })
	}

	return (
		<>
			<RichTextEditor
				value={note}
				onChange={onChange}
				rows={5}
				maxRows={18}
				saveTextCallback={() => {
					handleSaveNotes(note)
					toast.success(t('notes.successful_toast'))
				}}
			/>
		</>
	)
}
