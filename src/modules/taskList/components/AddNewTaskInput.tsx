import { getNewTask, isThisTaskDescriptionValid } from '@/modules/TaskBoard/model/task'
import { toast } from 'sonner'
import getErrorMessageForTheUser from '@/commond/utils/getErrorMessageForTheUser'
import { KeyboardEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { TeaxtareaWithActions } from '@/ui/molecules/TextAreaWithActions'
import TagGroupSelect from './Tags/components/TagGroupSelect'
import { useUserSelectedTags } from './Tags/hooks/useUserSelectedTags'
import { setUserSelectedTags } from './Tags/state/tagsReducer'
import { addTaskInFirstColumn } from '../useCase/addTask'
import { useTaskBoardQuery } from '../../TaskBoard/hooks/useTaskBoardQuery'
import { sortListOfTasksInColumnsByPriority } from '../models/sortListOfTasksInColumnsByPriority'
import { addChangeToTaskTimelineHistory } from '../useCase/addChangeToTaskTimelineHistory'
import { useGetColumnNameFromPosition } from '@/modules/TaskBoard/components/Columns/hooks/useGetColumnNameFromPosition'
import { useTaskListInEachColumn } from '../hooks/useTaskListInEachColumn'

export function AddNewTaskInput() {
	const [newTaskDescription, setNewTaskDescription] = useState('')
	const canUserUseTheAddTaskInput = !isThisTaskDescriptionValid(newTaskDescription)
	const { updateTaskBoard } = useTaskBoardQuery()
	const listOfTaskInColumns = useTaskListInEachColumn()
	const selectedTags = useUserSelectedTags()
	const getColumnName = useGetColumnNameFromPosition()

	const dispatch = useDispatch()

	const handleClick = () => {
		try {
			const task = getNewTask({
				descriptionText: newTaskDescription,
			})

			const updatedList = sortListOfTasksInColumnsByPriority(
				addTaskInFirstColumn({
					task: {
						...task,
						tags: selectedTags,
						timelineHistory: addChangeToTaskTimelineHistory({
							task: task,
							columnName: getColumnName('1'),
						}),
					},
					taskListInEachColumn: listOfTaskInColumns,
				})
			)

			updateTaskBoard(updatedList)
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
