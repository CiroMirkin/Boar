import { useContext } from 'react'
import { TaskContext } from '../../../../ui/organisms/BlankTask'
import { Button } from '@/ui/atoms/button'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useListOfTasksInColumnsQuery } from '../../hooks/useListOfTasksInColumnsQuery'
import { addTaskInTheLastColumn } from '../../state/actions/addTask'
import { sortListOfTasksInColumnsByPriority } from '../../models/sortListOfTasksInColumnsByPriority'
import { useArchivedTasksQuery } from '../hooks/useArchivedTasksQuery'
import { deleteThisArchivedTask } from '../state/actions/deleteArchivedTask'

export function TaskInArchiveActions() {
	const { t } = useTranslation()
	const task = useContext(TaskContext)
	const { listOfTaskInColumns, updateListOfTaskInColumns } = useListOfTasksInColumnsQuery()
	const { archivedTasks, updateArchivedTasks } = useArchivedTasksQuery()

	const askForConfirmationToDeleteTheTask = () => {
		toast.warning(t('archive.delete_task_warning'), {
			action: {
				label: t('archive.delete_task_btn'),
				onClick: deleteTaskAction,
			},
		})
	}

	const deleteTaskAction = () => {
		const updatedArchivedTasks = deleteThisArchivedTask({
			task,
			archive: archivedTasks,
		})
		updateArchivedTasks(updatedArchivedTasks)
	}

	const returnTaskToLastColumnAction = () => {
		const updatedListOfTaskInColumns = sortListOfTasksInColumnsByPriority(
			addTaskInTheLastColumn({
				taskListInEachColumn: listOfTaskInColumns || [],
				task,
			})
		)
		updateListOfTaskInColumns(updatedListOfTaskInColumns)

		const updatedArchivedTasks = deleteThisArchivedTask({
			task,
			archive: archivedTasks,
		})
		updateArchivedTasks(updatedArchivedTasks)

		toast.info(t('archive.return_task_to_board_toast'))
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
