import { useEffect } from 'react'
import RichTextEditor from '../RichTextEditor/RichTextEditor'
import { defaultNotes, maxLengthOfNotes, Notes as NotesModel } from '../model/notes'
import { useSession } from '@/SessionProvider'
import { getNotesFromSupabase } from '../repository/getNotesFromSupabase'
import LocalStorageNotesRepository from '../repository/LocalStorageNotesRepository'
import { saveNotes } from '../repository/saveNote'
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
			if (notesFromLocalStotage !== defaultNotes) {
				setNote(notesFromLocalStotage)
			}
		}
	}, [session, setNote])

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

	const handleSaveNotes = async (newNote: NotesModel) => {
		await saveNotes({ session, notes: newNote })
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
