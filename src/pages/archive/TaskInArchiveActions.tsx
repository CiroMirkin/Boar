import { useContext } from 'react'
import { TaskContext } from '../Task'
import { Button } from '@/ui/button'
import { useDispatch } from 'react-redux'
import { deleteArchivedTask } from '@/redux/archiveReducer'
import { useToast } from '@/ui/use-toast'
import { addTaskAtLastColumn } from '@/board/taskList/state/taskListInEachColumnReducer'
import { useAskForConfirmationToast } from '@/hooks/useAskForConfirmationToast'

export function TaskInArchiveActions() {
	const { deleteTaskAction, returnTaskToLastColumnAction } = useActionsForTaskInArchive()

	const askForConfirmationToDeleteTheTask = useAskForConfirmationToast({
		confirmationText: '¿Seguro que quieres eliminar esta tarea?',
		action: deleteTaskAction,
	})

	return (
		<>
			<Button
				size='sm'
				onClick={returnTaskToLastColumnAction}
				variant='ghost'
				className='w-full'
			>
				Regresar tarea al tablero
			</Button>
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

const useActionsForTaskInArchive = () => {
	const { toast } = useToast()
	const data = useContext(TaskContext)
	const dispatch = useDispatch()

	const deleteTaskAction = () => {
		dispatch(deleteArchivedTask(data))
	}
	const returnTaskToLastColumnAction = () => {
		dispatch(addTaskAtLastColumn(data))
		dispatch(deleteArchivedTask(data))
		toast({
			description: 'La tarea regreso a la última columna.',
			duration: 3000,
		})
	}

	return {
		deleteTaskAction,
		returnTaskToLastColumnAction,
	}
}
