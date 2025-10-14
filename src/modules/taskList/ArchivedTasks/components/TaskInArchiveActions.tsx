import { useContext } from 'react'
import { TaskContext } from '../../../../ui/organisms/BlankTask'
import { Button } from '@/ui/atoms/button'
import { useDispatch } from 'react-redux'
import { deleteArchivedTask } from '@/modules/taskList/ArchivedTasks/state/archiveReducer'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useListOfTasksInColumnsQuery } from '../../hooks/useListOfTasksInColumnsQuery'
import { addTaskInTheLastColumn } from '../../state/actions/addTask'
import { sortListOfTasksInColumnsByPriority } from '../../models/sortListOfTasksInColumnsByPriority'

export function TaskInArchiveActions() {
	const { t } = useTranslation()
	const { deleteTaskAction, returnTaskToLastColumnAction } = useActionsForTaskInArchive()

	const askForConfirmationToDeleteTheTask = () => {
		toast.warning(t('archive.delete_task_warning'), {
			action: {
				label: t('archive.delete_task_btn'),
				onClick: deleteTaskAction,
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
	const { listOfTaskInColumns, updateListOfTaskInColumns } = useListOfTasksInColumnsQuery()

	const deleteTaskAction = () => {
		dispatch(deleteArchivedTask(data))
	}
	const returnTaskToLastColumnAction = () => {
		const updatedListOfTaskInColumns = sortListOfTasksInColumnsByPriority(
			addTaskInTheLastColumn({
				taskListInEachColumn: listOfTaskInColumns || [],
				task: data,
			})
		)
		updateListOfTaskInColumns(updatedListOfTaskInColumns)
		dispatch(deleteArchivedTask(data))
		toast.info(t('archive.return_task_to_board_toast'))
	}

	return {
		deleteTaskAction,
		returnTaskToLastColumnAction,
	}
}
