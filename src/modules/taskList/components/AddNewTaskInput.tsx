import { iconSize } from '@/sharedByModules/configs/iconsConstants'
import { getNewTask, isThisTaskDescriptionValid } from '@/modules/taskList/models/task'
import { addTaskAtFirstColumn } from '@/modules/taskList/state/taskListInEachColumnReducer'
import { Button } from '@/ui/button'
import { useToast } from '@/ui/use-toast'
import getErrorMessageForTheUser from '@/sharedByModules/utils/getErrorMessageForTheUser'
import { Plus } from 'lucide-react'
import { KeyboardEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { AutoExpandTextarea } from './AutoExpandTextarea'

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

	const handleChange = (taskDescription: string) => {
		
		// Cuanto el texto tiene mas de 30 caracteres juntos sin espacios intermedios la aplicacion se congela, el siguiente codigo agrega un espacio en el caracter 25 para evitar que eso suceda

		setNewTaskDescription(
			taskDescription.replace(/[a-zA-Z0-9]{13,}/g, (match) => {
				return match.replace(/(.{25})/g, '$1 ').trim()
			})
		)
	}

	function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>): void {
		if (e.ctrlKey && e.key === 'Enter') handleClick()
	}

	const { t } = useTranslation()
	return (
		<>
			<AutoExpandTextarea
				value={newTaskDescription}
				className='mr-1.5'
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				placeholder={t('new_task_placeholder')}
			/>
			<Button
				id='add_new_task_btn'
				onClick={handleClick}
				variant='ghost'
				disabled={canUserUseTheAddTaskInput}
				title={t('new_task_btn_title')}
			>
				<Plus size={iconSize} />
			</Button>
		</>
	)
}
