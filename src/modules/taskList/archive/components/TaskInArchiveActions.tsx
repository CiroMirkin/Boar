import { useContext } from 'react'
import { TaskContext } from '../../../shared/components/Task'
import { Button } from '@/ui/button'
import { useDispatch } from 'react-redux'
import { deleteArchivedTask } from '@/modules/taskList/archive/state/archiveReducer'
import { useToast } from '@/ui/use-toast'
import { addTaskAtLastColumn } from '@/modules/taskList/state/taskListInEachColumnReducer'
import { useAskForConfirmationToast } from '@/modules/shared/hooks/useAskForConfirmationToast'
import { useTranslation } from 'react-i18next'

export function TaskInArchiveActions() {
	const { t } = useTranslation()
	const { deleteTaskAction, returnTaskToLastColumnAction } = useActionsForTaskInArchive()

	const askForConfirmationToDeleteTheTask = useAskForConfirmationToast({
		confirmationText: t('archive.delete_task_warning'),
		action: deleteTaskAction,
	})

	return (
		<>
			<Button
				size='sm'
				onClick={returnTaskToLastColumnAction}
				variant='ghost'
				className='w-full'
			>
				{t('archive.return_task_to_board_btn')}
			</Button>
			<Button
				size='sm'
				variant='destructiveGhost'
				className='w-full'
				onClick={askForConfirmationToDeleteTheTask}
			>
				{t('archive.delete_task_btn')}
			</Button>
		</>
	)
}

const useActionsForTaskInArchive = () => {
	const { toast } = useToast()
	const { t } = useTranslation()
	const data = useContext(TaskContext)
	const dispatch = useDispatch()

	const deleteTaskAction = () => {
		dispatch(deleteArchivedTask(data))
	}
	const returnTaskToLastColumnAction = () => {
		dispatch(addTaskAtLastColumn(data))
		dispatch(deleteArchivedTask(data))
		toast({
			description: t('archive.return_task_to_board_toast'),
			duration: 3000,
		})
	}

	return {
		deleteTaskAction,
		returnTaskToLastColumnAction,
	}
}
