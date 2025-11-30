import { Button } from '@/ui/atoms/button'
import { toast } from 'sonner'
import { PlusIcon } from '@/ui/atoms/icons'
import getErrorMessageForTheUser from '@/sharedByModules/utils/getErrorMessageForTheUser'
import { Input } from '@/ui/atoms/input'
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { isThisColumnNameWithinTheLimitOfLetters } from '../../models/taskColumn'
import { useListOfTasksInColumnsQuery } from '../../hooks/useListOfTasksInColumnsQuery'
import { addNewTaskColumn } from '../../useCase/addNewTaskColumn'

export function AddNewColumnForm() {
	const [newColumnName, setNewColumnName] = useState('')
	const { updateListOfTaskInColumns, listOfTaskInColumns: taskBoard } =
		useListOfTasksInColumnsQuery()

	const theNewColumnNameIsBlank = !newColumnName.trim()
	const theNewColumnNameIsOffLimits = !isThisColumnNameWithinTheLimitOfLetters(newColumnName)
	const theNewColumnNameIsValid = theNewColumnNameIsBlank || theNewColumnNameIsOffLimits

	const handleAddNewColumn = () => {
		try {
			const updatedTaskBoard = addNewTaskColumn({
				status: newColumnName,
				taskBoard,
			})
			updateListOfTaskInColumns(updatedTaskBoard)
			setNewColumnName('')
		} catch (error) {
			toast.error(getErrorMessageForTheUser(error))
		}
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
		if (e.ctrlKey && e.key === 'Enter') {
			const theNewColumnNameIsNotBlank = !theNewColumnNameIsBlank
			theNewColumnNameIsNotBlank && handleAddNewColumn()
		}
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newColumnNameFromInput = e.target.value
		setNewColumnName(newColumnNameFromInput)
	}

	const { t } = useTranslation()
	return (
		<li className='self-center sm:self-end flex w-full max-w-sm gap-1.5'>
			<Input
				type='text'
				aria-label={t('settings.columns.new_column_btn')}
				placeholder={t('settings.columns.new_column_input_placeholder')}
				className='w-full'
				value={newColumnName}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
			/>
			<Button
				onClick={() => handleAddNewColumn()}
				title={t('settings.columns.new_column_btn')}
				disabled={theNewColumnNameIsValid}
				data-testid='BotonParaCrearUnaColumna'
			>
				<PlusIcon />
			</Button>
		</li>
	)
}
