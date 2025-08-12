import { Button } from '@/ui/atoms/button'
import { toast } from "sonner"
import { PlusIcon } from '@/ui/atoms/icons'
import getErrorMessageForTheUser from '@/sharedByModules/utils/getErrorMessageForTheUser'
import {
	getBlankColumnWithoutPosition,
	isThisColumnNameWithinTheLimitOfLetters,
} from '../models/column'
import { Input } from '@/ui/atoms/input'
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useCreateColumn } from '../../../sharedByModules/hooks/useCreateColumn'

export function AddNewColumnForm() {
	const [newColumnName, setNewColumnName] = useState('')

	const theNewColumnNameIsBlank = !newColumnName.trim()
	const theNewColumnNameIsOffLimits = !isThisColumnNameWithinTheLimitOfLetters(newColumnName)
	const theNewColumnNameIsValid = theNewColumnNameIsBlank || theNewColumnNameIsOffLimits
	
	const createColumn = useCreateColumn()
	const addNewColumn = () => {
		const newColumn = getBlankColumnWithoutPosition({ name: newColumnName })
		createColumn({ newColumn })
		setNewColumnName('')
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
		if (e.ctrlKey && e.key === 'Enter') {
			const theNewColumnNameIsNotBlank = !theNewColumnNameIsBlank
			theNewColumnNameIsNotBlank && handleClick(addNewColumn)
		}
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newColumnNameFromInput = e.target.value
		setNewColumnName(newColumnNameFromInput)
	}

	const handleClick = (action: () => void) => {
		try {
			action()
		} catch (error) {
			toast.error(getErrorMessageForTheUser(error))
		}
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
				onClick={() => handleClick(addNewColumn)}
				title={t('settings.columns.new_column_btn')}
				disabled={theNewColumnNameIsValid}
			>
				<PlusIcon />
			</Button>
		</li>
	)
}
