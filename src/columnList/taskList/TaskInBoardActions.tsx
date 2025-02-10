import { Button } from '@/ui/button'
import { TaskContext } from '../../components/Task'
import { useToast } from '@/ui/use-toast'
import { useDispatch } from 'react-redux'
import {
	deleteTask,
	moveTaskToNextColumn,
	moveTaskToPrevColumn,
} from '@/columnList/taskList/state/taskListInEachColumnReducer'
import { useCheckIfThisTaskIsInTheFirstColumn } from '@/columnList/hooks/useCheckIfThisTaskIsInTheFirstColumn'
import { useCheckIfTaskIsInTheLastColumn } from '@/columnList/hooks/useCheckIfTaskIsInTheLastColumn'
import { useContext } from 'react'
import getErrorMessageForTheUser from '@/utils/getErrorMessageForTheUser'
import { archiveTask } from '@/archive/state/archiveReducer'
import { ToastAction } from '@/ui/toast'
import { taskModel } from '@/columnList/taskList/models/task'
import { useTranslation } from 'react-i18next'

export function TaskInBoardActions() {
	const { t } = useTranslation()
	const data = useContext(TaskContext)
	const isTheTaskInTheFirstColumn = useCheckIfThisTaskIsInTheFirstColumn(data)
	const isTheTaskInTheLastColumn = useCheckIfTaskIsInTheLastColumn(data)

	const {
		deleteTaskAction,
		moveTaskToNextColumnAction,
		moveTaskToPrevColumnAction,
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
							{ t('task_buttons.delete') }
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
				<Button
					size='sm'
					disabled={isTheTaskInTheFirstColumn}
					variant={isTheTaskInTheFirstColumn ? 'ghost' : 'default'}
					onClick={() => handleClick(moveTaskToPrevColumnAction)}
				>
					{ t('task_buttons.prev_btn') }
				</Button>
				<Button
					size='sm'
					disabled={isTheTaskInTheLastColumn}
					variant={isTheTaskInTheLastColumn ? 'ghost' : 'default'}
					onClick={() => handleClick(moveTaskToNextColumnAction)}
				>
					{ t('task_buttons.next_btn') }
				</Button>
			</div>
			<Button
				size='sm'
				variant='ghost'
				className='w-full'
				onClick={() => copyTextToClipboard()}
			>
				{ t('task_buttons.copy_text') }
			</Button>
			{isTheTaskInTheLastColumn && (
				<Button
					size='sm'
					variant='ghost'
					className='w-full'
					onClick={() => handleClick(archiveTaskAction)}
				>
					{ t('task_buttons.archive') }
				</Button>
			)}
			<Button
				size='sm'
				variant='destructiveGhost'
				className='w-full'
				onClick={askForConfirmationToDeleteTheTask}
			>
				{ t('task_buttons.delete') }
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

	const moveTaskToNextColumnAction = () => dispatch(moveTaskToNextColumn(data))
	const moveTaskToPrevColumnAction = () => dispatch(moveTaskToPrevColumn(data))
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
		moveTaskToNextColumnAction,
		moveTaskToPrevColumnAction,
		deleteTaskAction,
		copyTextToClipboard,
	}
}
