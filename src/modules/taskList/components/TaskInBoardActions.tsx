import { Button } from '@/ui/button'
import { TaskContext } from '../../../sharedByModules/components/BlankTask'
import { useToast } from '@/ui/use-toast'
import { useDispatch } from 'react-redux'
import {
	deleteTask,
} from '@/modules/taskList/state/taskListInEachColumnReducer'
import { useCheckIfThisTaskIsInTheFirstColumn } from '@/sharedByModules/hooks/useCheckIfThisTaskIsInTheFirstColumn'
import { useCheckIfTaskIsInTheLastColumn } from '@/sharedByModules/hooks/useCheckIfTaskIsInTheLastColumn'
import { useContext } from 'react'
import getErrorMessageForTheUser from '@/sharedByModules/utils/getErrorMessageForTheUser'
import { archiveTask } from '@/modules/taskList/archive/state/archiveReducer'
import { ToastAction } from '@/ui/toast'
import { taskModel } from '@/modules/taskList/models/task'
import { useTranslation } from 'react-i18next'
import { MoveButttons } from './MoveButtons'

export function TaskInBoardActions() {
	const { t } = useTranslation()
	const data = useContext(TaskContext)
	const isTheTaskInTheFirstColumn = useCheckIfThisTaskIsInTheFirstColumn(data)
	const isTheTaskInTheLastColumn = useCheckIfTaskIsInTheLastColumn(data)

	const {
		deleteTaskAction,
		archiveTaskAction,
		copyTextToClipboard,
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
			<Button
				size='sm'
				variant='ghost'
				className='w-full'
				onClick={() => copyTextToClipboard()}
			>
				{t('task_buttons.copy_text')}
			</Button>
			{isTheTaskInTheLastColumn && (
				<Button
					size='sm'
					variant='ghost'
					className='w-full'
					onClick={() => handleClick(archiveTaskAction)}
				>
					{t('task_buttons.archive')}
				</Button>
			)}
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
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const { toast } = useToast()

	const copyTextToClipboard = () => {
		const text = data.descriptionText
		navigator.clipboard.writeText(text).then(() => {
			toast({
				description: t('task_buttons.copy_text_toast'),
				duration: 3000,
			})
		})
	}

	const deleteTaskAction = () => dispatch(deleteTask(data))

	const archiveTaskAction = () => {
		dispatch(archiveTask(data))
		dispatch(deleteTask(data))
		toast({
			description: t('task_buttons.archive_toast'),
			duration: 3000,
		})
	}

	return {
		archiveTaskAction,
		deleteTaskAction,
		copyTextToClipboard,
	}
}
