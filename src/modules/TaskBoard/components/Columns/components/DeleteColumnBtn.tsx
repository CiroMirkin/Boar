import { Button } from '@/ui/atoms/button'
import { TrashIcon } from '@/ui/atoms/icons'
import { useTranslation } from 'react-i18next'
import { deleteThisTaskColumn } from '@/modules/TaskBoard/useCase/deleteTaskList'
import { useTaskBoardQuery } from '@/modules/TaskBoard/hooks/useTaskBoardQuery'
import { Column } from '../model/column'
import { toast } from 'sonner'

function DeleteColumnBtn({ column }: { column: Column }) {
	const { t } = useTranslation()
	const { updateTaskBoard, taskBoard } = useTaskBoardQuery()

	const deleteColumnHandle = () => {
		const updatedTaskBoard = deleteThisTaskColumn({ id: column.id, taskBoard })
		updateTaskBoard(updatedTaskBoard)
	}

	const askForConfirmationToDeleteTheColumn = () => {
		toast.warning(`${t('settings.columns.delete_column_warning')} "${column.name}"?`, {
			action: {
				label: t('task_buttons.delete'),
				onClick: deleteColumnHandle,
			},
		})
	}

	return (
		<Button
			onClick={() => askForConfirmationToDeleteTheColumn()}
			variant='destructiveGhost'
			data-testid='BotonParaEliminarUnaColumna'
			title={t('settings.columns.delete_column_btn')}
		>
			<TrashIcon />
		</Button>
	)
}

export default DeleteColumnBtn
