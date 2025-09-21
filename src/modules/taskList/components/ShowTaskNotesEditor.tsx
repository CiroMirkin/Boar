import { Dialog } from '@radix-ui/react-dialog'
import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/ui/molecules/dialog'
import { Button } from '@/ui/atoms/button'
import RichTextEditor from '@/modules/notes/RichTextEditor/RichTextEditor'
import { useDataOfTheTask } from '../hooks/useDataOfTheTask'
import { MessageSquareTextIcon } from '@/ui/atoms/icons'
import { useDispatch } from 'react-redux'
import { updateNotesAndCommentsOfThisTask } from '../state/taskListInEachColumnReducer'
import { checkMaxLengthOfNotesAndComments } from '../models/NotesAndComments'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

export default function ShowTaskNotesEditor() {
	const task = useDataOfTheTask()
	const dispatch = useDispatch()
	const { t } = useTranslation()

	const onChange = (text: string) => {
		if (!checkMaxLengthOfNotesAndComments(text)) {
			toast.error(t('task_notes.max_length_toast'))
			return
		}

		dispatch(
			updateNotesAndCommentsOfThisTask({
				task,
				notes: text,
			})
		)
	}

	return (
		<Dialog>
			<DialogTrigger asChild title={t('task_notes.title')}>
				<Button size='sm' variant='ghost' className='w-full'>
					<MessageSquareTextIcon />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{task.descriptionText}</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<div>
					<RichTextEditor
						value={task.notesAndComments ? task.notesAndComments : ''}
						onChange={onChange}
					/>
				</div>
			</DialogContent>
		</Dialog>
	)
}
