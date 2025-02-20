import { useState } from 'react'
import { Column, isThisColumnNameWithinTheLimitOfLetters } from '../models/column'
import { useDispatch } from 'react-redux'
import { changeColumnName, deleteColumn } from '@/modules/columnList/state/columnListReducer'
import { Button } from '../../../ui/button'
import { useToast } from '../../../ui/use-toast'
import { Pencil, Trash2 } from 'lucide-react'
import { iconSize } from '@/modules/shared/configs/iconsConstants'
import { Input } from '@/ui/input'
import { deleteTheTaskListOfThisColumn } from '@/modules/columnList/taskList/state/taskListInEachColumnReducer'
import getErrorMessageForTheUser from '@/modules/shared/utils/getErrorMessageForTheUser'
import { useAskForConfirmationToast } from '@/modules/shared/hooks/useAskForConfirmationToast'
import { useTranslation } from 'react-i18next'

interface ConfigColumnParams {
	column: Column
}

export function ConfigColumn({ column }: ConfigColumnParams) {
	const { t } = useTranslation()
	const [showChangeColumnNameInput, setShowChangeColumnNameInput] = useState(false)
	const [columnName, setColumnName] = useState(column.name)
	const updateBoardData = useDispatch()
	const { toast } = useToast()

	const editColumnNameHandle = () => {
		if (showChangeColumnNameInput) {
			updateBoardData(changeColumnName({ column, newColumnName: columnName }))
		}
		setShowChangeColumnNameInput(!showChangeColumnNameInput)
	}

	const deleteColumnHandle = () => {
		updateBoardData(deleteColumn(column))
		updateBoardData(deleteTheTaskListOfThisColumn(column))
	}

	const askForConfirmationToDeleteTheColumn = useAskForConfirmationToast({
		confirmationText: `${t('settings.columns.delete_column_warning')} "${columnName}"?`,
		action: deleteColumnHandle,
	})

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
		<li key={column.id} className='w-full p-2 flex flex-col gap-2 content-stretch border'>
			<header className='w-full flex gap-2'>
				<Input
					value={columnName}
					onChange={(e) =>
						isThisColumnNameWithinTheLimitOfLetters(e.target.value) &&
						setColumnName(e.target.value)
					}
					disabled={!showChangeColumnNameInput}
				/>
				<Button onClick={() => handleClick(editColumnNameHandle)} variant='ghost'>
					<Pencil size={iconSize} />
				</Button>
			</header>
			<Button
				onClick={() => handleClick(askForConfirmationToDeleteTheColumn)}
				variant='destructiveGhost'
			>
				<Trash2 size={iconSize} className='mr-2' /> { t('settings.columns.delete_column_btn') }
			</Button>
		</li>
	)
}
