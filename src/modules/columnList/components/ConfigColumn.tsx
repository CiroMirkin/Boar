import { useState } from 'react'
import { Column, isThisColumnNameWithinTheLimitOfLetters } from '../models/column'
import { useDispatch } from 'react-redux'
import { changeColumnName } from '@/modules/columnList/state/columnListReducer'
import { Button } from '../../../ui/button'
import { toast } from "sonner"
import { Pencil, Trash2 } from 'lucide-react'
import { iconSize } from '@/sharedByModules/configs/iconsConstants'
import { Input } from '@/ui/input'
import getErrorMessageForTheUser from '@/sharedByModules/utils/getErrorMessageForTheUser'
import { useTranslation } from 'react-i18next'
import { useDeleteColumn } from '../../../sharedByModules/hooks/useDeleteColumn'

interface ConfigColumnParams {
	column: Column
}

export function ConfigColumn({ column }: ConfigColumnParams) {
	const { t } = useTranslation()
	const [showChangeColumnNameInput, setShowChangeColumnNameInput] = useState(false)
	const [columnName, setColumnName] = useState(column.name)
	const updateBoardData = useDispatch()

	const editColumnNameHandle = () => {
		if (showChangeColumnNameInput) {
			updateBoardData(changeColumnName({ column, newColumnName: columnName }))
		}
		setShowChangeColumnNameInput(!showChangeColumnNameInput)
	}

	const deleteColumn = useDeleteColumn()
	const deleteColumnHandle = () => deleteColumn({ column })

	const askForConfirmationToDeleteTheColumn = () => {
		toast.warning(`${t('settings.columns.delete_column_warning')} "${columnName}"?`, {
			action: {
				label: t('task_buttons.delete'),
				onClick: deleteColumnHandle
			},
		})
	
	}

	const handleClick = (action: () => void) => {
		try {
			action()
		} catch (error) {
			toast.error(getErrorMessageForTheUser(error))
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
				<Trash2 size={iconSize} className='mr-2' />{' '}
				{t('settings.columns.delete_column_btn')}
			</Button>
		</li>
	)
}
