import { getNewTask, isThisTaskDescriptionValid } from '@/modules/taskList/models/task'
import { toast } from 'sonner'
import getErrorMessageForTheUser from '@/sharedByModules/utils/getErrorMessageForTheUser'
import { KeyboardEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { TeaxtareaWithActions } from '@/ui/molecules/TextAreaWithActions'
import TagGroupSelect from '../Tags/components/TagGroupSelect'
import { useUserSelectedTags } from '../Tags/hooks/useUserSelectedTags'
import { setUserSelectedTags } from '../Tags/state/tagsReducer'
import { addTaskInFirstColumn } from '../useCase/addTask'
import { useListOfTasksInColumnsQuery } from '../hooks/useListOfTasksInColumnsQuery'
import { sortListOfTasksInColumnsByPriority } from '../models/sortListOfTasksInColumnsByPriority'

export function AddNewTaskInput() {
	const [newTaskDescription, setNewTaskDescription] = useState('')
	const canUserUseTheAddTaskInput = !isThisTaskDescriptionValid(newTaskDescription)
	const { listOfTaskInColumns, updateListOfTaskInColumns } = useListOfTasksInColumnsQuery()
	const selectedTags = useUserSelectedTags()

	const dispatch = useDispatch()

	const handleClick = () => {
		try {
			const currentList = listOfTaskInColumns || []

			const task = getNewTask({
				descriptionText: newTaskDescription,
				columnPosition: '1',
			})

			const updatedList = sortListOfTasksInColumnsByPriority(
				addTaskInFirstColumn({
					task: { ...task, tags: selectedTags },
					taskListInEachColumn: currentList,
				})
			)

			updateListOfTaskInColumns(updatedList)
			dispatch(setUserSelectedTags([]))
			setNewTaskDescription('')
		} catch (error) {
			toast.error(getErrorMessageForTheUser(error))
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
		<div className='px-4 w-full flex'>
			<TeaxtareaWithActions
				value={newTaskDescription}
				id='add_new_task_btn'
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				placeholder={t('new_task_placeholder')}
				onClick={handleClick}
				btnTitle={t('new_task_btn_title')}
				btnDisabled={canUserUseTheAddTaskInput}
				badges={<TagGroupSelect />}
			/>
		</div>
	)
}
