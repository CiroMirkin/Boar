import { Dialog } from '@radix-ui/react-dialog'
import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/ui/molecules/dialog'
import { Button } from '@/ui/atoms/button'
import { MinimalTiptapEditor } from '@/ui/organisms/MinimalTiptapEditor'
import { useDataOfTheTask } from '../hooks/useDataOfTheTask'
import { MessageSquareTextIcon } from '@/ui/atoms/icons'
import { checkMaxLengthOfNotesAndComments } from '../models/NotesAndComments'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { updateNotesAndCommentsOfThisTask } from '../useCase/updateNotesAndCommentsOfThisTask'
import { useListOfTasksInColumnsQuery } from '../hooks/useListOfTasksInColumnsQuery'
import { useTaskListInEachColumn } from '../hooks/useTaskListInEachColumn'

export default function ShowTaskNotesEditor() {
	const task = useDataOfTheTask()
	const { updateListOfTaskInColumns } = useListOfTasksInColumnsQuery()
	const listOfTaskInColumns = useTaskListInEachColumn()
	const { t } = useTranslation()

	const onChange = (text: string) => {
		if (!checkMaxLengthOfNotesAndComments(text)) {
			toast.error(t('task_notes.max_length_toast'))
			return
		}

		const updatedList = updateNotesAndCommentsOfThisTask({
			listOfTaskInColumns: listOfTaskInColumns,
			taskToUpdate: task,
			notes: text,
		})
		updateListOfTaskInColumns(updatedList)
	}

	return (
		<Dialog>
			<DialogTrigger asChild title={t('task_notes.title')}>
				<Button size='sm' variant='ghost' className='w-full'>
					<MessageSquareTextIcon />
				</Button>
			</DialogTrigger>
			<DialogContent className='!max-w-3xl'>
				<DialogHeader>
					<DialogTitle>{task.descriptionText}</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<div>
					<MinimalTiptapEditor
						value={task.notesAndComments ? task.notesAndComments : ''}
						onChange={onChange}
						saveTextCallback={() => {
							toast.success(t('task_notes.save_toast'))
						}}
					/>
				</div>
			</DialogContent>
		</Dialog>
	)
}
