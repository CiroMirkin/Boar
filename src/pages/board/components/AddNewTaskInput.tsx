import { iconSize } from '@/configs/iconsConstants'
import { getNewTask, isThisTaskDescriptionValid } from '@/models/task'
import { addTaskAtFirstColumn } from '@/redux/taskListInEachColumnReducer'
import { Button } from '@/ui/button'
import { Textarea } from '@/ui/textarea'
import { useToast } from '@/ui/use-toast'
import getErrorMessageForTheUser from '@/utils/getErrorMessageForTheUser'
import { Plus } from 'lucide-react'
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { useDispatch } from 'react-redux'

export function AddNewTaskInput() {
	const [newTaskDescription, setNewTaskDescription] = useState('')
	const canUserUseTheAddTaskInput = !isThisTaskDescriptionValid(newTaskDescription)

	const { toast } = useToast()

	const dispatch = useDispatch()

	const handleClick = () => {
		try {
			const task = getNewTask({ descriptionText: newTaskDescription, columnPosition: '1' })
			dispatch(addTaskAtFirstColumn(task))
			setNewTaskDescription('')
		} catch (error) {
			toast({
				description: getErrorMessageForTheUser(error),
				variant: 'destructive',
				duration: 3000,
			})
		}
	}

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const taskDescription = e.target.value
		setNewTaskDescription(taskDescription)
	}

	function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>): void {
		if (e.ctrlKey && e.key === 'Enter') handleClick()
	}

	return (
		<>
			<Textarea
				value={newTaskDescription}
				className='mr-1.5'
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				placeholder='Nueva tarea...'
			/>
			<Button
				onClick={handleClick}
				variant='ghost'
				disabled={canUserUseTheAddTaskInput}
				title='Crear tarea'
			>
				<Plus size={iconSize} />
			</Button>
		</>
	)
}
