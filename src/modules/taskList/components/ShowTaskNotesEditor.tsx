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
import { checkMaxLengthOfNotesAndComments } from '../models/task'
import { toast } from 'sonner'

export default function ShowTaskNotesEditor() {
	const task = useDataOfTheTask()
	const dispatch = useDispatch()

	const onChange = (text: string) => {
		console.log(checkMaxLengthOfNotesAndComments(text), text.length)
		if (!checkMaxLengthOfNotesAndComments(text)) {
			toast.error('Se alcanzo el máximo de caracteres para una nota.')
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
			<DialogTrigger asChild title={'Notas y comentarios'}>
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
