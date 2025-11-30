import { useContext } from 'react'
import { TaskContext } from '@/ui/organisms/BlankTask'
import { Button } from '@/ui/atoms/button'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useArchivedTasksQuery } from '../hooks/useArchivedTasksQuery'
import { deleteThisArchivedTask } from '../useCase/deleteArchivedTask'

export function DeleteArchivedTaskButton() {
	const { t } = useTranslation()
	const task = useContext(TaskContext)
	const { archivedTasks, updateArchivedTasks } = useArchivedTasksQuery()

	const deleteTaskAction = () => {
		const updatedArchivedTasks = deleteThisArchivedTask({
			task,
			archive: archivedTasks,
		})
		updateArchivedTasks(updatedArchivedTasks)
	}

	const askForConfirmationToDeleteTheTask = () => {
		toast.warning(t('archive.delete_task_warning'), {
			action: {
				label: t('archive.delete_task_btn'),
				onClick: deleteTaskAction,
			},
		})
	}

	return (
		<Button
			size='sm'
			variant='destructiveGhost'
			className='w-full'
			onClick={askForConfirmationToDeleteTheTask}
		>
			{t('archive.delete_task_btn')}
		</Button>
	)
}
