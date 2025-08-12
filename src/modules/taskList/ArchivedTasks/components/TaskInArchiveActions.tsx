import { useContext } from 'react'
import { TaskContext } from '../../../../ui/organisms/BlankTask'
import { Button } from '@/ui/atoms/button'
import { useDispatch } from 'react-redux'
import { deleteArchivedTask } from '@/modules/taskList/ArchivedTasks/state/archiveReducer'
import { toast } from "sonner"
import { addTaskAtLastColumn } from '@/modules/taskList/state/taskListInEachColumnReducer'
import { useTranslation } from 'react-i18next'

export function TaskInArchiveActions() {
	const { t } = useTranslation()
	const { deleteTaskAction, returnTaskToLastColumnAction } = useActionsForTaskInArchive()

	const askForConfirmationToDeleteTheTask = () => {
		toast.warning(t('archive.delete_task_warning'), {
			action: {
				label: t('archive.delete_task_btn'),
				onClick: deleteTaskAction
			},
		})
	}

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
	const { t } = useTranslation()
	const data = useContext(TaskContext)
	const dispatch = useDispatch()

	const deleteTaskAction = () => {
		dispatch(deleteArchivedTask(data))
	}
	const returnTaskToLastColumnAction = () => {
		dispatch(addTaskAtLastColumn(data))
		dispatch(deleteArchivedTask(data))
		toast.success(t('archive.return_task_to_board_toast'))
	}

	return {
		deleteTaskAction,
		returnTaskToLastColumnAction,
	}
}
