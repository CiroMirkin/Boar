import { useCheckIfThisTaskIsInTheFirstColumn } from '@/modules/taskList/components/Columns/hooks/useCheckIfThisTaskIsInTheFirstColumn'
import { Button } from '@/ui/atoms/button'
import { useTranslation } from 'react-i18next'
import { useDataOfTheTask } from '../hooks/useDataOfTheTask'
import { toast } from 'sonner'
import { TrashIcon } from '@/ui/atoms/icons'
import { useTaskBoardQuery } from '../../TaskBoard/hooks/useTaskBoardQuery'
import { deleteThisTask } from '../useCase/deleteTask'
import { useTaskListInEachColumn } from '../hooks/useTaskListInEachColumn'

interface DeleteButtonProps {
	handleClick: (action: () => void) => void
}

export function DeleteTaskButton({ handleClick }: DeleteButtonProps) {
	const { t } = useTranslation()
	const data = useDataOfTheTask()
	const isTheTaskInTheFirstColumn = useCheckIfThisTaskIsInTheFirstColumn(data)
	const { updateTaskBoard } = useTaskBoardQuery()
	const listOfTaskInColumns = useTaskListInEachColumn()

	const deleteTaskAction = () => {
		const updatedList = deleteThisTask({
			taskListInEachColumn: listOfTaskInColumns,
			task: data,
		})
		updateTaskBoard(updatedList)
	}

	const askForConfirmationToDeleteTheTask = () => {
		isTheTaskInTheFirstColumn
			? handleClick(deleteTaskAction)
			: toast.warning(t('task_buttons.delete_task_warning'), {
					action: {
						label: t('task_buttons.delete'),
						onClick: () => handleClick(deleteTaskAction),
					},
				})
	}

	return (
		<Button
			size='sm'
			variant='destructiveGhost'
			className='w-full'
			onClick={askForConfirmationToDeleteTheTask}
			data-testid='BotonEliminarTarea'
			title={t('task_buttons.delete')}
		>
			<TrashIcon />
		</Button>
	)
}
