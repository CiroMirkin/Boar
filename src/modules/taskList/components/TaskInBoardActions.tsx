import { Button } from '@/ui/button'
import { useToast } from '@/ui/use-toast'
import { useDispatch } from 'react-redux'
import {
	deleteTask,
} from '@/modules/taskList/state/taskListInEachColumnReducer'
import { useCheckIfThisTaskIsInTheFirstColumn } from '@/sharedByModules/hooks/useCheckIfThisTaskIsInTheFirstColumn'
import { useCheckIfTaskIsInTheLastColumn } from '@/sharedByModules/hooks/useCheckIfTaskIsInTheLastColumn'
import getErrorMessageForTheUser from '@/sharedByModules/utils/getErrorMessageForTheUser'
import { ToastAction } from '@/ui/toast'
import { taskModel } from '@/modules/taskList/models/task'
import { useTranslation } from 'react-i18next'
import { MoveButttons } from './MoveButtons'
import { useDataOfTheTask } from '../hooks/useDataOfTheTask'
import { CopyTextButton } from './CopyTextButton'
import { ArchiveTaskButton } from './ArchiveTaskButton'

export function TaskInBoardActions() {
	const { t } = useTranslation()
	const data = useDataOfTheTask()
	const isTheTaskInTheFirstColumn = useCheckIfThisTaskIsInTheFirstColumn(data)
	const isTheTaskInTheLastColumn = useCheckIfTaskIsInTheLastColumn(data)

	const {
		deleteTaskAction,
	} = useActionsForTaskInBoard(data)

	const { toast } = useToast()
	const askForConfirmationToDeleteTheTask = () => {
		isTheTaskInTheFirstColumn
			? handleClick(deleteTaskAction)
			: toast({
					description: t('task_buttons.delete_task_warning'),
					variant: 'destructive',
					duration: 3000,
					action: (
						<ToastAction
							altText={t('task_buttons.delete')}
							onClick={() => handleClick(deleteTaskAction)}
						>
							{t('task_buttons.delete')}
						</ToastAction>
					),
				})
	}
	const handleClick = (action: () => void) => {
		try {
			action()
		} catch (error) {
			toast({
				description: getErrorMessageForTheUser(error),
				variant: 'destructive',
				duration: 3000,
			})
		}
	}

	return (
		<>
			<div className='w-full grid grid-flow-col justify-stretch gap-1.5'>
				<MoveButttons handleClick={handleClick} />
			</div>
			<CopyTextButton />			
			{isTheTaskInTheLastColumn && <ArchiveTaskButton handleClick={handleClick} />}
			<Button
				size='sm'
				variant='destructiveGhost'
				className='w-full'
				onClick={askForConfirmationToDeleteTheTask}
			>
				{t('task_buttons.delete')}
			</Button>
		</>
	)
}

const useActionsForTaskInBoard = (data: taskModel) => {
	const dispatch = useDispatch()

	const deleteTaskAction = () => dispatch(deleteTask(data))

	return {
		deleteTaskAction,
	}
}
