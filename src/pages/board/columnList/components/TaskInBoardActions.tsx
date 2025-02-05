import { Button } from '@/ui/button'
import { TaskContext } from '../../../Task'
import { useToast } from '@/ui/use-toast'
import { useDispatch } from 'react-redux'
import {
	deleteTask,
	moveTaskToNextColumn,
	moveTaskToPrevColumn,
} from '@/redux/taskListInEachColumnReducer'
import { useCheckIfThisTaskIsInTheFirstColumn } from '@/pages/board/hooks/useCheckIfThisTaskIsInTheFirstColumn'
import { useCheckIfTaskIsInTheLastColumn } from '@/pages/board/hooks/useCheckIfTaskIsInTheLastColumn'
import { useContext } from 'react'
import getErrorMessageForTheUser from '@/utils/getErrorMessageForTheUser'
import { archiveTask } from '@/redux/archiveReducer'
import { ToastAction } from '@/ui/toast'
import { taskModel } from '@/models/task'

export function TaskInBoardActions() {
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
					description: `¿Seguro que quieres eliminar esta tarea?`,
					variant: 'destructive',
					duration: 3000,
					action: (
						<ToastAction
							altText='Eliminar'
							onClick={() => handleClick(deleteTaskAction)}
						>
							Eliminar
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
					Retroceder
				</Button>
				<Button
					size='sm'
					disabled={isTheTaskInTheLastColumn}
					variant={isTheTaskInTheLastColumn ? 'ghost' : 'default'}
					onClick={() => handleClick(moveTaskToNextColumnAction)}
				>
					Avanzar
				</Button>
			</div>
			<Button
				size='sm'
				variant='ghost'
				className='w-full'
				onClick={() => copyTextToClipboard()}
			>
				Copiar texto
			</Button>
			{isTheTaskInTheLastColumn && (
				<Button
					size='sm'
					variant='ghost'
					className='w-full'
					onClick={() => handleClick(archiveTaskAction)}
				>
					Archivar
				</Button>
			)}
			<Button
				size='sm'
				variant='destructiveGhost'
				className='w-full'
				onClick={askForConfirmationToDeleteTheTask}
			>
				Eliminar
			</Button>
		</>
	)
}

const useActionsForTaskInBoard = (data: taskModel) => {
	const dispatch = useDispatch()
	const { toast } = useToast()

	const copyTextToClipboard = () => {
		const text = data.descriptionText
		navigator.clipboard.writeText(text).then(() => {
			toast({
				description: 'Texto copiado al portapapeles',
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
			description: 'La tarea se guardo en el archivo.',
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
