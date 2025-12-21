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
import { useTaskBoardQuery } from '@/modules/TaskBoard/hooks/useTaskBoardQuery'
import { useTaskListInEachColumn } from '../hooks/useTaskListInEachColumn'
import { useState } from 'react'

export default function ShowTaskNotesEditor() {
	const task = useDataOfTheTask()
	const { updateTaskBoard } = useTaskBoardQuery()
	const listOfTaskInColumns = useTaskListInEachColumn()
	const { t } = useTranslation()
	const [text, setText] = useState(task.notesAndComments || '')

	const saveText = () => {
		if (!checkMaxLengthOfNotesAndComments(text)) {
			toast.error(t('task_notes.max_length_toast'))
			return
		}

		const updatedList = updateNotesAndCommentsOfThisTask({
			listOfTaskInColumns: listOfTaskInColumns,
			taskToUpdate: task,
			notes: text,
		})
		updateTaskBoard(updatedList)
	}

	const handleDialogOpenChange = (isOpen: boolean) => {
		if (!isOpen) {
			saveText()
		}
	}
	return (
		<Dialog onOpenChange={handleDialogOpenChange}>
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
						value={text}
						onChange={setText}
						onSave={() => {
							saveText()
							toast.success(t('task_notes.save_toast'))
						}}
					/>
				</div>
			</DialogContent>
		</Dialog>
	)
}
