import { iconSize } from '@/shared/configs/iconsConstants'
import { getNewTask, isThisTaskDescriptionValid } from '@/modules/taskList/models/task'
import { addTaskAtFirstColumn } from '@/modules/taskList/state/taskListInEachColumnReducer'
import { Button } from '@/ui/button'
import { Textarea } from '@/ui/textarea'
import { useToast } from '@/ui/use-toast'
import getErrorMessageForTheUser from '@/shared/utils/getErrorMessageForTheUser'
import { Plus } from 'lucide-react'
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

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

	const { t } = useTranslation()
	return (
		<>
			<Textarea
				value={newTaskDescription}
				className='mr-1.5'
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				placeholder={t('new_task_placeholder')}
			/>
			<Button
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
