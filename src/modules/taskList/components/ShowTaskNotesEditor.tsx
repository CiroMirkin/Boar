import { Dialog } from '@radix-ui/react-dialog'
import { DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/ui/molecules/dialog'
import { Button } from '@/ui/atoms/button'
import RichTextEditor from '@/modules/notes/RichTextEditor/RichTextEditor'
import { useDataOfTheTask } from '../hooks/useDataOfTheTask'
import { MessageSquareTextIcon } from '@/ui/atoms/icons'
import { useDispatch } from 'react-redux'
import { updateNotesAndCommentsOfThisTask } from '../state/taskListInEachColumnReducer'

export default function ShowTaskNotesEditor() {
	const task = useDataOfTheTask()
	const dispatch = useDispatch()

	const onChange = (text: string) => {
		dispatch(
			updateNotesAndCommentsOfThisTask({
				task,
				notes: text,
			})
		)
	}

	return (
		<Dialog>
			<DialogTrigger title={'Notas y comentarios'}>
				<Button size='sm' variant='ghost' className='w-full'>
					<MessageSquareTextIcon />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{task.descriptionText}</DialogTitle>
				</DialogHeader>
				<div className=''>
					<RichTextEditor
						value={task.notesAndComments ? task.notesAndComments : ''}
						onChange={onChange}
					/>
				</div>
			</DialogContent>
		</Dialog>
	)
}
